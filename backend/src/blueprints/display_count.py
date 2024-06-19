# from flask import Blueprint, request, jsonify
# from bson import ObjectId
# import os
# import cv2
# import numpy as np
# from cvzone.PoseModule import PoseDetector
# import subprocess

# display_count_bp = Blueprint("display_count_bp", __name__)

# # Define Constants
# COLORS = [(0, 255, 0), (0, 255, 255), (0, 0, 255)]  # Example colors for different ranges of angles
# radius = 50  # Define radius for arc segment (adjust as needed)

# # Define the function for drawing the angle arc segment
# def draw_angle_arc(frame, midpoint, radius, start_angle, end_angle, color):
#     cv2.ellipse(frame, midpoint, (radius, radius), 0, np.degrees(start_angle), np.degrees(end_angle), color, -1)

# @display_count_bp.route('/videos/display-count/<video_id>', methods=['GET'])
# def get_display_count(video_id):
#     from app import mongo
#     videos = mongo.db.videos
#     if videos is None:
#         return jsonify({'error': 'Error connecting to database'}), 500
    
#     try:
#         video_object_id = ObjectId(video_id)
#         video_document = videos.find_one({'_id': video_object_id})

#         if video_document:
#             video_file_path = video_document.get("path")
#             number_of_actions = video_document.get('number_of_actions')
#             parent_video_file_path = os.path.dirname(video_file_path)
#             input_points = video_document.get('input_points')
#             angles = video_document.get('angles')

#             replacement_map = {'0': 11, '1': 12, '2': 13, '3': 14, '4': 15, '5': 16, '6': 23, '7': 24, '8': 25, '9': 26}

#             response_data = {
#                 'video_id': str(video_object_id),
#                 'path': video_file_path,
#                 'number_of_actions': number_of_actions,
#                 'angles': angles
#             }

#             angles = [[float(angle['start']), float(angle['end'])] for angle in angles]
#             print(angles)


#             for point in input_points:
#                 for key in ['midPoint', 'point1', 'point2']:
#                     point[key] = ''.join(str(replacement_map.get(char, char)) for char in point[key])

#             # Create counting_array
#             counting_array = [[int(point['midPoint']), int(point['point1']), int(point['point2']), *angle]
#                   for point, angle in zip(input_points, angles)]
#             print(counting_array)
#             count = str(counting_array[0])
#             last_pack = str(counting_array[len(counting_array)-1]) 
#             print(count)
#             print(last_pack)
            
#             file_name, _ = os.path.splitext(os.path.basename(video_file_path))
#             output_video_file_path = os.path.join(parent_video_file_path, 'counting', f'{file_name}.mp4')
#             output_video_file_path = output_video_file_path.replace("\\", "/")

#             if os.path.exists(output_video_file_path):
#                 return jsonify({'filePath': output_video_file_path})
#             else:
#                 cap = cv2.VideoCapture(video_file_path)
#                 if not cap.isOpened():
#                     return jsonify({'error': 'Failed to open video capture'}), 500

#                 pd = PoseDetector(trackCon=0.70, detectionCon=0.70)

#                 frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#                 frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
#                 fps = int(cap.get(cv2.CAP_PROP_FPS))
#                 codec = 'libx264'
#                 output_command = ['ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo', '-s',
#                                   f'{frame_width}x{frame_height}', '-pix_fmt', 'bgr24', '-r', f'{fps}', '-i', '-',
#                                   '-c:v', f'{codec}', output_video_file_path]

#                 try:
#                     process = subprocess.Popen(' '.join(output_command), stdin=subprocess.PIPE, shell=True)
#                 except Exception as e:
#                     return jsonify({'error': f"Error executing command: {e}"}), 500

#                 total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#                 current_frame = 0
#                 counter = 0
#                 stage = 'none'
#                 count = str(counting_array[0])
#                 last_pack = str(counting_array[len(counting_array)-1]) 

#                 while current_frame < total_frames:
#                     ret, frame = cap.read()
#                     if not ret:
#                         break

#                     pd.findPose(frame, draw=0)
#                     lmList, _ = pd.findPosition(frame, draw=0, bboxWithHands=0)

#                     if lmList:
#                         for i, landmarks in enumerate(counting_array):
#                             mid1_x = int(lmList[landmarks[0]][0])
#                             mid1_y = int(lmList[landmarks[0]][1])
#                             x1 = int(lmList[landmarks[1]][0])
#                             y1 = int(lmList[landmarks[1]][1])
#                             x2 = int(lmList[landmarks[2]][0])
#                             y2 = int(lmList[landmarks[2]][1])

#                             start = landmarks[3]
#                             end = landmarks[4]

#                             middle = int(landmarks[0])
#                             point_1 = int(landmarks[1])
#                             point_2 = int(landmarks[2])

                        
#                             # Calculate angles between the lines
#                             angle1 = np.arctan2(y1 - mid1_y, x1 - mid1_x)
#                             angle2 = np.arctan2(y2 - mid1_y, x2 - mid1_x)
#                             angle_between_lines = np.abs(np.degrees(angle1 - angle2))

#                             # Draw arc segment between lines
#                             color_index = min(int(angle_between_lines / 60), len(COLORS) - 1)
#                             start_angle = min(angle1, angle2)
#                             end_angle = max(angle1, angle2)
#                             draw_angle_arc(frame, (mid1_x, mid1_y), radius, start_angle, end_angle, COLORS[color_index])


#                             # Display the angle text
#                             angle_text = f"Angle: {angle_between_lines:.2f}"
#                             cv2.putText(frame, angle_text, (mid1_x, mid1_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

#                             cv2.circle(frame, (mid1_x, mid1_y), 5, (0, 0, 255), cv2.FILLED) 

#                             # Draw lines from middle to point_1 and point_2
#                             cv2.line(frame, (mid1_x, mid1_y), (x1, y1), (255, 0, 0), 3)  # Line from middle to point_1
#                             cv2.line(frame, (mid1_x, mid1_y), (x2, y2), (255, 0, 0), 3)  # Line from middle to point_2

#                             # Counting logic
#                             angle_text_float = float(angle_text.split(':')[-1])
#                             print(angle_text_float)
#                             print(start, end)
#                             print(middle, point_1, point_2)
#                             print(landmarks)

#                             print(stage)
#                             print("    ")


#                             if start > end and count == str(landmarks):
#                                 if angle_text_float > start and stage == 'none':
#                                     print("Condition 1 met: Angle text > start and stage is 'none'")
#                                     stage = str(landmarks)+'start'
#                                     print("After:", landmarks)
#                                 elif angle_text_float <= end and stage == str(landmarks)+'start':
#                                     print("Condition 2 met: Angle text <= end and stage is 'start'")
#                                     stage = 'none'
#                                     if count == last_pack:
#                                         counter += 1
#                                         print("Counter:", counter)
                                    
#                                     if i+1  < len(counting_array):
#                                         count = str(counting_array[i+1])
#                                     else:
#                                         count = str(counting_array[0])

#                             elif start < end and count == str(landmarks):  
#                                 if angle_text_float <= start and stage == 'none':
#                                     print("Condition 3 met: Angle text <= start and stage is 'stage'")
#                                     stage = str(landmarks)+'start'
#                                     print("After:", landmarks)
#                                 elif angle_text_float > end and stage == str(landmarks)+'start':
#                                     print("Condition 4 met: Angle text > end and stage is 'start'")
#                                     stage = 'none'
#                                     if count == last_pack:
#                                         counter += 1
#                                         print("Counter:", counter)
                                    
#                                     if i+1  < len(counting_array):
#                                         count = str(counting_array[i+1])
#                                     else:
#                                         count = str(counting_array[0])
                                        

#                     cv2.putText(frame, f"Count: {counter}, Stage: {stage}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

#                     process.stdin.write(frame.tobytes())
#                     current_frame += 1

#                 process.stdin.close()
#                 process.wait()
#                 cap.release()

#             return jsonify({'filePath': output_video_file_path}) 

#         else:
#             return jsonify({'error': 'Video not found'}), 400
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500



from flask import Blueprint, request, jsonify
from bson import ObjectId
import os
import cv2
import numpy as np
from cvzone.PoseModule import PoseDetector
import subprocess

display_count_bp = Blueprint("display_count_bp", __name__)

# Define Constants
COLORS = [(0, 255, 0), (0, 255, 255), (0, 0, 255)]  # Example colors for different ranges of angles
radius = 50  # Define radius for arc segment (adjust as needed)

# Define the function for drawing the angle arc segment
def draw_angle_arc(frame, midpoint, radius, start_angle, end_angle, color):
    cv2.ellipse(frame, midpoint, (radius, radius), 0, np.degrees(start_angle), np.degrees(end_angle), color, -1)

@display_count_bp.route('/videos/display-count/<video_id>', methods=['GET'])
def get_display_count(video_id):
    from app import mongo
    videos = mongo.db.videos
    if videos is None:
        return jsonify({'error': 'Error connecting to database'}), 500
    
    try:
        video_object_id = ObjectId(video_id)
        video_document = videos.find_one({'_id': video_object_id})

        if video_document:
            video_file_path = video_document.get("path")
            number_of_actions = video_document.get('number_of_actions')
            parent_video_file_path = os.path.dirname(video_file_path)
            input_points = video_document.get('input_points')
            angles = video_document.get('angles')
            print(video_file_path)
            print(input_points)
            print(angles)
            print(number_of_actions)


            replacement_map = {'0': 11, '1': 12, '2': 13, '3': 14, '4': 15, '5': 16, '6': 23, '7': 24, '8': 25, '9': 26}

            response_data = {
                'video_id': str(video_object_id),
                'path': video_file_path,
                'number_of_actions': number_of_actions,
                'angles': angles
            }

            angles = [[float(angle['start']), float(angle['end'])] for angle in angles]
            print(angles)


            for point in input_points:
                for key in ['midPoint', 'point1', 'point2']:
                    point[key] = ''.join(str(replacement_map.get(char, char)) for char in point[key])

            # Create counting_array
            counting_array = [[int(point['midPoint']), int(point['point1']), int(point['point2']), *angle]
                  for point, angle in zip(input_points, angles)]
            print(counting_array)
            count = str(counting_array[0])
            last_pack = str(counting_array[len(counting_array)-1]) 
            print(count)
            print(last_pack)
            
            file_name, _ = os.path.splitext(os.path.basename(video_file_path))
            output_video_file_path = os.path.join(parent_video_file_path, 'counting', f'{file_name}.mp4')
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
                counter = 0
                stage = 'none'
                count = str(counting_array[0])
                last_pack = str(counting_array[len(counting_array)-1]) 

                while current_frame < total_frames:
                    ret, frame = cap.read()
                    if not ret:
                        break

                    pd.findPose(frame, draw=0)
                    lmList, _ = pd.findPosition(frame, draw=0, bboxWithHands=0)

                    if lmList:
                        for i, landmarks in enumerate(counting_array):
                            mid1_x = int(lmList[landmarks[0]][0])
                            mid1_y = int(lmList[landmarks[0]][1])
                            x1 = int(lmList[landmarks[1]][0])
                            y1 = int(lmList[landmarks[1]][1])
                            x2 = int(lmList[landmarks[2]][0])
                            y2 = int(lmList[landmarks[2]][1])

                            start = landmarks[3]
                            end = landmarks[4]

                            middle = int(landmarks[0])
                            point_1 = int(landmarks[1])
                            point_2 = int(landmarks[2])

                        
                            # Calculate angles between the lines
                            angle1 = np.arctan2(y1 - mid1_y, x1 - mid1_x)
                            angle2 = np.arctan2(y2 - mid1_y, x2 - mid1_x)
                            angle_between_lines = np.abs(np.degrees(angle1 - angle2))
                            if angle_between_lines > 180.00:
                                angle_between_lines = 360 - angle_between_lines

                            # Draw arc segment between lines
                            color_index = min(int(angle_between_lines / 60), len(COLORS) - 1)
                            start_angle = min(angle1, angle2)
                            end_angle = max(angle1, angle2)
                            draw_angle_arc(frame, (mid1_x, mid1_y), radius, start_angle, end_angle, COLORS[color_index])


                            # Display the angle text
                            angle_text = f"Angle: {angle_between_lines:.2f}"
                            cv2.putText(frame, angle_text, (mid1_x, mid1_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                            cv2.circle(frame, (mid1_x, mid1_y), 5, (0, 0, 255), cv2.FILLED) 

                            # Draw lines from middle to point_1 and point_2
                            cv2.line(frame, (mid1_x, mid1_y), (x1, y1), (255, 0, 0), 3)  # Line from middle to point_1
                            cv2.line(frame, (mid1_x, mid1_y), (x2, y2), (255, 0, 0), 3)  # Line from middle to point_2

                            # Counting logic
                            angle_text_float = float(angle_text.split(':')[-1])
                            print(angle_text_float)
                            print(start, end)
                            print(middle, point_1, point_2)
                            print(landmarks)

                            print(stage)
                            print("    ")


                            if start > end and count == str(landmarks):
                                if angle_text_float > start and stage == 'none':
                                    print("Condition 1 met: Angle text > start and stage is 'none'")
                                    stage = str(landmarks)+'start'
                                    print("After:", landmarks)
                                elif angle_text_float <= end and stage == str(landmarks)+'start':
                                    print("Condition 2 met: Angle text <= end and stage is 'start'")
                                    stage = 'none'
                                    if count == last_pack:
                                        counter += 1
                                        print("Counter:", counter)
                                    
                                    if i+1  < len(counting_array):
                                        count = str(counting_array[i+1])
                                    else:
                                        count = str(counting_array[0])

                            elif start < end and count == str(landmarks):  
                                if angle_text_float <= start and stage == 'none':
                                    print("Condition 3 met: Angle text <= start and stage is 'stage'")
                                    stage = str(landmarks)+'start'
                                    print("After:", landmarks)
                                elif angle_text_float > end and stage == str(landmarks)+'start':
                                    print("Condition 4 met: Angle text > end and stage is 'start'")
                                    stage = 'none'
                                    if count == last_pack:
                                        counter += 1
                                        print("Counter:", counter)
                                    
                                    if i+1  < len(counting_array):
                                        count = str(counting_array[i+1])
                                    else:
                                        count = str(counting_array[0])
                                        

                    cv2.putText(frame, f"Count: {counter}, Stage: {stage}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

                    process.stdin.write(frame.tobytes())
                    current_frame += 1

                process.stdin.close()
                process.wait()
                cap.release()

            return jsonify({'filePath': output_video_file_path}) 

        else:
            return jsonify({'error': 'Video not found'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
