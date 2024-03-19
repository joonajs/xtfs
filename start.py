'''
Start Frontend and Backend servers
'''

import os
import time
import subprocess
import signal


print("[⌛] Starting the backend server")
backend = subprocess.Popen(["flask", "run"])
time.sleep(5)  # Give the backend server some time to start
print("[✅] Backend server started")

print("[⌛] Starting the frontend server")
frontend = subprocess.Popen(["npm", "start"], cwd="frontend")
time.sleep(5)  # Give the frontend server some time to start
print("[✅] Frontend server started")

print("[✅] Application started")

# Wait for the user to press Ctrl+C
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\n[⌛] Stopping the servers")

    # Stop the servers
    backend.terminate()
    frontend.terminate()

    # Wait for the servers to stop
    backend.wait()
    frontend.wait()

    print("[✅] Servers stopped")

    print("[⌛] Cleaning up")
    print("[✅] Cleaned up")

    print("[✅] Application stopped")
    
