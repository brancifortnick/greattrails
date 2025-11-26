#!/usr/bin/env python3
"""
Download placeholder trail images from Picsum (Lorem Picsum)
"""
import requests
import os
import time

# Create images directory if it doesn't exist
images_dir = "react-app/public/assets/images"
os.makedirs(images_dir, exist_ok=True)

# Using Picsum for reliable placeholder images
# Format: https://picsum.photos/seed/{seed}/800/600
base_url = "https://picsum.photos/seed"

print("Downloading 50 trail images...")
print(f"Saving to: {images_dir}")

for i in range(1, 51):
    try:
        # Use trail number as seed for consistent images
        url = f"{base_url}/trail{i}/800/600"
        
        print(f"Downloading trail{i}.jpg... ", end="", flush=True)
        
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            filepath = os.path.join(images_dir, f"trail{i}.jpg")
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"✓ ({len(response.content) // 1024} KB)")
        else:
            print(f"✗ (HTTP {response.status_code})")
        
        # Small delay to be respectful
        time.sleep(0.2)
        
    except Exception as e:
        print(f"✗ Error: {e}")

# Download default trail image
try:
    print("\nDownloading default-trail.jpg... ", end="", flush=True)
    response = requests.get(f"{base_url}/default-trail/800/600", timeout=10)
    if response.status_code == 200:
        filepath = os.path.join(images_dir, "default-trail.jpg")
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"✓ ({len(response.content) // 1024} KB)")
    else:
        print(f"✗ (HTTP {response.status_code})")
except Exception as e:
    print(f"✗ Error: {e}")

print("\n✨ Image download complete!")
print(f"📁 Images saved to: {images_dir}")
print(f"🔢 Total images: {len([f for f in os.listdir(images_dir) if f.endswith('.jpg')])}")
