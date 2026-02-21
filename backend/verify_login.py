import requests
import json
import sys

# Try localhost and 127.0.0.1
urls = ["http://localhost:8000/api/login/", "http://127.0.0.1:8000/api/login/"]
payload = {
    "login_id": "praful@zsyio.com",
    "password": "Praful@zsyio12s"
}

for url in urls:
    print(f"Testing URL: {url}")
    try:
        response = requests.post(url, json=payload)
        print(f"Status: {response.status_code}")
        # print(f"Response: {response.text}") 
        if response.status_code == 200:
            print("Login SUCCESS!")
            break
        else:
            print(f"Login FAILED with status {response.status_code}")
            print(f"Response: {response.text[:200]}...") # Print first 200 chars
    except Exception as e:
        print(f"Connection Error: {e}")
