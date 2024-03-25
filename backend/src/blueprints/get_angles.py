from flask import Blueprint, render_template, redirect, url_for, request, jsonify
import os
from werkzeug.utils import secure_filename
from bson import ObjectId
import cv2
from cvzone.PoseModule import PoseDetector

from flask import send_file 



get_angles_bp = Blueprint("get_angles_bp", __name__)


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
            nuber_of_actions = video_document.get('number_of_actions')
            input_points = video_document.get('input_points')

            print(parent_video_file_path)
            print(nuber_of_actions)
            print(input_points)

           
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

            print("Modified input_points:", input_points)


            action_landmarks_list = []
            mid_points_landmarks_list = []

            for points in input_points:
                mid_point = int(points['midPoint'])
                point1 = int(points['point1'])
                point2 = int(points['point2'])

                
                action_landmarks = [point1,mid_point,point2]
                mid_points_landmarks = mid_point

                action_landmarks_list.append(action_landmarks)
                mid_points_landmarks_list.append(mid_points_landmarks)

            print(action_landmarks_list)
            print(mid_points_landmarks_list)

            file_name, _ = os.path.splitext(os.path.basename(video_file_path))
            output_video_file_path = os.path.join(parent_video_file_path, 'get_angles_videos', f'{file_name}.mp4')
            output_video_file_path = output_video_file_path.replace("\\", "/")

            print(output_video_file_path)






            if os.path.exists(output_video_file_path):
                print("video exists")
                return jsonify({'filePath': output_video_file_path})
            

            
                
            else:
                cap = cv2.VideoCapture(video_file_path)

                if not cap.isOpened():
                    print({'error': 'Failed to open video capture'})
                    exit(1)

                pd = PoseDetector(trackCon=0.70, detectionCon=0.70)

                frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                fps = int(cap.get(cv2.CAP_PROP_FPS))
                codec = int(cap.get(cv2.CAP_PROP_FOURCC))  # encoding video frame
                out = cv2.VideoWriter(output_video_file_path, codec, fps, (frame_width, frame_height))

                total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
                current_frame = 0

                while current_frame < total_frames:
                    ret, frame = cap.read()

                    if not ret:
                        break

                    # Detect pose
                    pd.findPose(frame, draw=0)
                    lmList, _ = pd.findPosition(frame, draw=0, bboxWithHands=0)

                    if lmList:
                        for landmarks in action_landmarks_list:
                             point =[lmList[i] for i in landmarks]

                             mid1_x = int(point[1][0])
                             mid1_y = int(point[1][1])

                             cv2.circle(frame, (mid1_x, mid1_y), 5, (0, 0, 255), cv2.FILLED) 

                             for i in range(len(point) - 1):
                               x1, y1 = point[i][:2]
                               x2, y2 = point[i + 1][:2]
                               cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 3)  # Draw line between consecutive landmarks


                        # action1_landmarks = [lmList[i] for i in [12, 14, 16]]
                        # action2_landmarks = [lmList[i] for i in [11, 13, 15,]]

                        # mid1_x = int(action1_landmarks[1][0])
                        # mid1_y = int(action1_landmarks[1][1])

                        # cv2.circle(frame, (mid1_x, mid1_y), 5, (0, 0, 255), cv2.FILLED) 

                        # mid2_x = int(action2_landmarks[1][0])
                        # mid2_y = int(action2_landmarks[1][1])
                        
                        # cv2.circle(frame, (mid2_x, mid2_y), 5, (0, 0, 255), cv2.FILLED)

                        # for i in range(len(action1_landmarks) - 1):
                        #     x1, y1 = action1_landmarks[i][:2]
                        #     x2, y2 = action1_landmarks[i + 1][:2]
                        #     cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 3)  # Draw line between consecutive landmarks

                        # for i in range(len(action2_landmarks) - 1):
                        #     x1, y1 = action2_landmarks[i][:2]
                        #     x2, y2 = action2_landmarks[i + 1][:2]
                        #     cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 3)  # Draw line between consecutive landmarks


                    out.write(frame)

                    current_frame += 1

                cap.release()
                out.release()

                print("save as sample video")
                return jsonify({'filePath': output_video_file_path})
        else:
            return jsonify({'error': 'Video not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

