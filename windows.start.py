'''
Start Frontend and Backend servers, made for Windows.
'''

import os
import subprocess

def run_xtfs():
    
    flask_app_directory = os.path.join(os.getcwd(), 'backend/app')
    react_app_directory = os.path.join(os.getcwd(), 'frontend/xtfs-react-app')
    
    
    
    
    xtfs_backend = f'cmd.exe /k "cd /d {flask_app_directory} && python main.py"'
    xtfs_frontend = f'cmd.exe /k "cd /d {react_app_directory} && npm start"'
    
    # Backend
    xtfs_backend_pop = subprocess.Popen(xtfs_backend, creationflags=subprocess.CREATE_NEW_CONSOLE)
    
    # Frontend
    os.chdir(xtfs_frontend)
    xtfs_frontend_pop = subprocess.Popen(xtfs_frontend, creationflags=subprocess.CREATE_NEW_CONSOLE)
    
    print("Servers started. Close the command prompt windows to stop them.")
    
if __name__ == '__main__':
    run_xtfs()