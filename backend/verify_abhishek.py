import requests
import json
import sys

# Try localhost and 127.0.0.1
urls = ["http://localhost:8000/api/login/", "http://127.0.0.1:8000/api/login/"]
payload = {
    "login_id": "abhishek@zsyio.com",
    "password": "Abhishek@zsyio@12t"
}

for url in urls:
    print(f"Testing URL: {url}")
    try:
        response = requests.post(url, json=payload)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print("Login SUCCESS!")
            break
        else:
            print(f"Login FAILED with status {response.status_code}")
            print(f"Response: {response.text[:200]}...")
    except Exception as e:
        print(f"Connection Error: {e}")
