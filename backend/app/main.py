"""
<-> main.py component for XTEMPS
"""
import tempfile
import shutil
import os
import logging
from flask import Flask, request, send_from_directory, render_template, abort
from werkzeug.utils import secure_filename
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)
ALLOWED_EXTENSIONS = {
    # Text files
    'txt', 'pdf', 'md', 'json', 'csv', 'xml', 'html', 'css',
    # Programming and markup languages
    'py', 'js', 'jsx', 'ts', 'java', 'cpp', 'c', 'h', 'sh', 'bas', 'ps1', 'psm1', 'psd1',
    'ps1xml', 'psc1', 'pssc', 'msh', 'msh1', 'msh2', 'mshxml', 'msh1xml', 'msh2xml',
    # Office formats
    'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
    # Image formats
    'png', 'jpg', 'jpeg', 'gif', 'webp', 'psd', 'epub',
    # Audio formats
    'mp3', 'wav', 'm4a', 'm4b', 'm4r', 'oga', 'opus',
    # Video formats
    'mp4', 'avi', 'mov', 'webm', 'flv', 'ogv', 'm4v', 'f4v', 'f4a', 'f4b',
    # Archive formats
    'zip', 'tar', 'gz', 'rar', '7z', 'bz2', 'xz',
    # Executable and script formats
    'apk', 'exe', 'bat', 'lnk', 'inf', 'reg', 'url',
    # Other formats
    'bin', 'scf', 'm3u', 'spx'
}

## THIS IS THE TEMPORARY DIRECTORY WHERE THE FILES WILL BE STORED.
## IT WILL BE DELETED WHEN THE SERVER IS SHUT DOWN.
## THE DIRECTORY IS CREATED IN THE SYSTEM'S TEMPORARY DIRECTORY
## SO THE SPACE AVAILABLE IS EQUAL TO YOUR SYSTEM'S HARD DRIVE SPACE.
temp_dir = os.path.join(tempfile.gettempdir(), 'xtfs_temp')
if os.path.exists(temp_dir):
    # REMOVES EVERYTHING IN THE TEMP DIRECTORY IF IT DIDN'T GET DELETED
    shutil.rmtree(temp_dir)
os.makedirs(temp_dir)
logging.info('Temporary directory set and cleared at %s', temp_dir)    
    

app = Flask(__name__)
CORS(app)


def allowed_file(filename):
    """Check if the filename's extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and os.path.exists("static/" + path):
        return send_from_directory('static', path)
    else:
        return render_template("home.html")

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle multiple file uploads."""
    files = request.files.getlist('files')  # Get all files

    if not files:
        return 'No file part', 400

    filepaths = []  # Store file paths for response

    for file in files:
        if file.filename == '':
            continue  # Skip empty files
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(temp_dir, filename)
            file.save(filepath)
            filepaths.append(filepath)

    if not filepaths:
        return 'No valid files uploaded', 400

    return f'Files uploaded successfully: {", ".join(filepaths)}', 200


@app.route('/files', methods=['GET'])
def list_files():
    """List all files in the temporary directory."""
    files = os.listdir(temp_dir)
    (total, used, free) = shutil.disk_usage(temp_dir)
    return {'files': files, 'total': total, 'used': used, 'free': free} 
    # Send a JSON response containing the files.
    """Show the space in the temporary directory & space used"""


@app.route('/files/<filename>', methods=['GET', 'DELETE'])  # Notice the corrected methods definition
def file_operations(filename):
    safe_filename = secure_filename(filename)
    file_path = os.path.join(temp_dir, safe_filename)

    if not os.path.exists(file_path):
        abort(404)  # If the file does not exist, return a 404 error

    if request.method == 'DELETE':
        os.remove(file_path)  # Remove the file
        return {'message': f'{safe_filename} deleted'}, 200  # Return a confirmation message

    return send_from_directory(temp_dir, safe_filename)  # For GET, send the file

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    safe_filename = secure_filename(filename)
    file_path = os.path.join(temp_dir, safe_filename)

    if not os.path.exists(file_path):
        abort(404)
    
    return send_from_directory(temp_dir, safe_filename, as_attachment=True)

@app.route('/download', methods=['POST'])
def download_files():
    files = request.json.get('files', [])
    if not files:
        return 'No files to download', 400
    
    zip_name = 'download.zip'
    zip_path = os.path.join(temp_dir, zip_name)
    with shutil.zipfile.ZipFile(zip_path, 'w') as zipf:
        for file in files:
            file_path = os.path.join(temp_dir, file)
            if os.path.exists(file_path):
                zipf.write(file_path, file)
    
    return send_from_directory(temp_dir, zip_name, as_attachment=True)


@app.route('/shutdown', methods=['POST'])
def shutdown():
    """Shut down the server."""
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    shutil.rmtree(temp_dir)
    logging.info('Server shutting down...')
    # ALL THE DATA IS LOST HERE.
    return 'Server shutting down...', 200


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 9501))
    app.run(host='0.0.0.0', port=port)
