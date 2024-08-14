async function generateResponse() {
    const prompt = document.getElementById('prompt').value;
    const responseDiv = document.getElementById('response');
    const audioPlayer = document.getElementById('audioPlayer');

    try {
        const response = await fetch('http://localhost:8000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseDiv.innerText = data.response;

        // Log the audio URL for debugging
        console.log(`Audio URL: ${data.audio_url}`);

        // Set the audio player source to the audio URL and play it
        audioPlayer.src = `http://localhost:8000${data.audio_url}`;
        audioPlayer.style.display = 'block';
        audioPlayer.load(); // Load the new source
        audioPlayer.play();
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerText = 'An error occurred while generating the response.';
        audioPlayer.style.display = 'none';
    }
}
