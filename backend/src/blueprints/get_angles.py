from flask import Blueprint, jsonify
import os
from bson import ObjectId
import cv2
import numpy as np
from cvzone.PoseModule import PoseDetector
import subprocess

get_angles_bp = Blueprint("get_angles_bp", __name__)

# Define Constants
COLORS = [(0, 255, 0), (0, 255, 255), (0, 0, 255)]  # Example colors for different ranges of angles
radius = 50  # Define radius for arc segment (adjust as needed)


# Define the function for drawing the angle arc segment
def draw_angle_arc(frame, midpoint, radius, start_angle, end_angle, color):
    cv2.ellipse(frame, midpoint, (radius, radius), 0, np.degrees(start_angle), np.degrees(end_angle), color, -1)


@get_angles_bp.route('/videos/get-angles/<video_id>', methods=['GET'])
def get_video_details(video_id):
    from app import mongo
    videos = mongo.db.videos
    if videos is None:
        return jsonify({'error': 'Videos collection not found'}), 500
    try:
        # Convert video_id string to ObjectId
        video_object_id = ObjectId(video_id)

        # Find the video document based on the ObjectId
        video_document = videos.find_one({'_id': video_object_id})

        if video_document:
            video_file_path = video_document.get('path')
            parent_video_file_path = os.path.dirname(video_file_path)
            number_of_actions = video_document.get('number_of_actions')
            input_points = video_document.get('input_points')

            # Replace point numbers to mediapipe numbers
            replacement_map = {'0': 11, '1': 12, '2': 13, '3': 14, '4': 15, '5': 16, '6': 23, '7': 24, '8': 25, '9': 26}

            for point in input_points:
                mid_point = point['midPoint']
                point1 = point['point1']
                point2 = point['point2']

                mid_point_replaced = ''.join(str(replacement_map.get(char, char)) for char in mid_point)
                point1_replaced = ''.join(str(replacement_map.get(char, char)) for char in point1)
                point2_replaced = ''.join(str(replacement_map.get(char, char)) for char in point2)

                point['midPoint'] = mid_point_replaced
                point['point1'] = point1_replaced
                point['point2'] = point2_replaced

            action_landmarks_list = []

            for points in input_points:
                mid_point = int(points['midPoint'])
                point1 = int(points['point1'])
                point2 = int(points['point2'])

                action_landmarks = [point1, mid_point, point2]
                action_landmarks_list.append(action_landmarks)

            file_name, _ = os.path.splitext(os.path.basename(video_file_path))
            output_video_file_path = os.path.join(parent_video_file_path, 'get_angles_videos', f'{file_name}.mp4')
            output_video_file_path = output_video_file_path.replace("\\", "/")

            if os.path.exists(output_video_file_path):
                return jsonify({'filePath': output_video_file_path})

            else:
                cap = cv2.VideoCapture(video_file_path)

                if not cap.isOpened():
                    return jsonify({'error': 'Failed to open video capture'}), 500

                pd = PoseDetector(trackCon=0.70, detectionCon=0.70)

                frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                fps = int(cap.get(cv2.CAP_PROP_FPS))
                codec = 'libx264'
                output_command = ['ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo', '-s',
                                  f'{frame_width}x{frame_height}', '-pix_fmt', 'bgr24', '-r', f'{fps}', '-i', '-',
                                  '-c:v', f'{codec}', output_video_file_path]

                try:
                    process = subprocess.Popen(' '.join(output_command), stdin=subprocess.PIPE, shell=True)
                except Exception as e:
                    return jsonify({'error': f"Error executing command: {e}"}), 500

                total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
                current_frame = 0

                while current_frame < total_frames:
                    ret, frame = cap.read()

                    if not ret:
                        break

                    pd.findPose(frame, draw=0)
                    lmList, _ = pd.findPosition(frame, draw=0, bboxWithHands=0)

                    if lmList:
                        for landmarks in action_landmarks_list:
                            point = [lmList[i] for i in landmarks]

                            mid1_x = int(point[1][0])
                            mid1_y = int(point[1][1])
                            x1 = int(point[0][0])
                            y1 = int(point[0][1])
                            x2 = int(point[2][0])
                            y2 = int(point[2][1])

                            # Calculate angles between the lines
                            angle1 = np.arctan2(y1 - mid1_y, x1 - mid1_x)
                            angle2 = np.arctan2(y2 - mid1_y, x2 - mid1_x)
                            angle_between_lines = np.abs(np.degrees(angle1 - angle2))

                            # Draw arc segment between lines
                            color_index = min(int(angle_between_lines / 60), len(COLORS) - 1)
                            start_angle = min(angle1, angle2)
                            end_angle = max(angle1, angle2)
                            draw_angle_arc(frame, (mid1_x, mid1_y), radius, start_angle, end_angle, COLORS[color_index])

                            # Display the angle text
                            angle_text = f"Angle: {angle_between_lines:.2f}"
                            cv2.putText(frame, angle_text, (mid1_x, mid1_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                            cv2.circle(frame, (mid1_x, mid1_y), 5, (0, 0, 255), cv2.FILLED) 

                            for i in range(len(point) - 1):
                               x1, y1 = point[i][:2]
                               x2, y2 = point[i + 1][:2]
                               cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 3)  # Draw line between consecutive landmarks

                    process.stdin.write(frame.tobytes())
                    current_frame += 1

                process.stdin.close()
                process.wait()
                cap.release()

                return jsonify({'filePath': output_video_file_path})

        else:
            return jsonify({'error': 'Video not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
