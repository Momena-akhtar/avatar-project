# Inside tts.py
from gtts import gTTS
import os
import uuid
def text_to_speech(text, output_file=None):
    try:
        if not text:
            raise ValueError("No text provided for TTS.")
        
        # If no filename is provided, generate a unique one
        if not output_file:
            output_file = f'{uuid.uuid4()}.mp3'

        # Initialize the TTS engine
        tts = gTTS(text=text, lang='en')

        # Save the audio to a file
        tts.save(output_file)
        print(f'Audio content written to "{output_file}"')

        # Check if the file was created
        if os.path.exists(output_file):
            print(f'Successfully created {output_file}')
        else:
            print(f'Failed to create {output_file}')
        
        return output_file
    except Exception as e:
        print(f"An error occurred in text_to_speech: {str(e)}")
