from flask import Blueprint, render_template, redirect, url_for, request, jsonify
import os
from werkzeug.utils import secure_filename
from bson import ObjectId
import cv2
from cvzone.PoseModule import PoseDetector

from flask import send_file 



view_fulldetect_bp = Blueprint("view_fulldetect_bp", __name__)


@view_fulldetect_bp.route('/videos/view-fulldetect/<video_id>', methods=['GET'])
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
            print(parent_video_file_path)
            file_name, _ = os.path.splitext(os.path.basename(video_file_path))
            output_video_file_path = os.path.join(parent_video_file_path, 'fulldetect_videos', f'{file_name}.mp4')
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
                        landmarks = [lmList[i] for i in [11, 12, 13, 14, 15, 16, 23, 24, 25, 26]]  
                          
                        for idx, point in enumerate(landmarks):
                            x, y = point[:2]
                            cv2.putText(frame, str(idx), (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2, cv2.LINE_AA)


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

