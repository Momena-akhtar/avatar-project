from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from llama_utils import generate_response  # Import your LLaMA response function
from tts import text_to_speech
import os
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

# Directory to store audio files
audio_dir = 'audio_files'
os.makedirs(audio_dir, exist_ok=True)

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        prompt = data.get('prompt', '')

        # Generate text response
        response_text = generate_response(prompt)

        # Generate unique audio filename
        audio_filename = f'{uuid.uuid4()}.mp3'
        audio_path = os.path.join(audio_dir, audio_filename)

        # Convert text response to speech
        text_to_speech(response_text, output_file=audio_path)

        # Return the text response and audio URL
        return jsonify({'response': response_text, 'audio_url': f'/audio/{audio_filename}'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/audio/<filename>', methods=['GET'])
def get_audio(filename):
    # Serve the audio file from the directory
    try:
        return send_from_directory(audio_dir, filename, mimetype='audio/mpeg')
    except Exception as e:
        print(f"Error serving audio file: {e}")
        return jsonify({'error': 'Audio file not found'}), 404

if __name__ == '__main__':
    app.run(port=8000, debug=True)
