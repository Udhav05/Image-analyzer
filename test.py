import ollama

# Path to your test image
image_path = "demo.png"   # make sure this file is inside your project folder

# Create a description with llava model
response = ollama.chat(
    model="llava:latest",
    messages=[
        {
            "role": "user",
            "content": "Describe this image in detail.",
            "images": [image_path]   # passing local image
        }
    ]
)

# Print response text
print("\n✅ Final Description:\n")
print(response["message"]["content"])
