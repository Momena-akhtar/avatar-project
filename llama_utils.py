from openai import OpenAI
from tts import text_to_speech
def generate_response(prompt, model="meta/llama-3.1-8b-instruct", temperature=0.2, top_p=0.7, max_tokens=1024, api_key="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"):
    # Initialize the OpenAI client with the base URL and API key
    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=api_key
    )

    # Create a completion request with the specified model and parameters
    completion = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        top_p=top_p,
        max_tokens=max_tokens,
        stream=True
    )

    # Initialize an empty string to store the complete response
    response_text = ""

    # Iterate through each chunk of the streaming completion response
    for chunk in completion:
        # Check if the current chunk has any content to append to the response
        if chunk.choices[0].delta.content is not None:
            # Append the content of the current chunk to the response string
            response_text += chunk.choices[0].delta.content 

    # Return the complete response text
    return response_text

def calculate_time(sentence):
    #calculates the number of words
    words = sentence.split()
    #calculates the time in seconds
    time = len(words)/3

    return time