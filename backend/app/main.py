"""
<-> main.py component for XTEMPS
"""
import tempfile
import shutil
import os
import logging
from flask import Flask, request, send_from_directory, render_template, abort
from werkzeug.utils import secure_filename

logging.basicConfig(level=logging.INFO)
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'apk',
                      'bin', 'bat', 'html', 'css', 'py', 'js', 'jsx', 'ts', 'md',
                      'json', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv',
                      'xml', 'mp3', 'mp4', 'wav', 'avi', 'mov', 'zip', 'tar', 'gz',
                      'rar', '7z', 'exe', 'java', 'cpp', 'c', 'h', 'sh', 'bas', 'ps1',
                      'psm1', 'psd1', 'ps1xml', 'psc1', 'pssc', 'msh', 'msh1', 'msh2',
                      'mshxml', 'msh1xml', 'msh2xml', 'scf', 'lnk', 'inf', 'reg', 'url',
                      'm3u', 'm4a', 'm4v', 'f4v', 'f4a', 'm4b', 'm4r', 'f4b', 'mov',
                      'webm', 'weba', 'flv', 'ogg', 'oga', 'ogv', 'spx', 'opus', 'pdf',
                      'epub', 'zip', 'tar', 'rar', 'gz', 'bz2', '7z', 'xz', 'pdf', 'epub',
                      'zip', 'tar', 'rar', 'gz', 'bz2', '7z', 'xz', 'pdf', 'epub', 'zip', 'webp'
                      }
app = Flask(__name__)

temp_dir = tempfile.mkdtemp()
logging.info('Temporary directory created at %s', temp_dir)

def allowed_file(filename):
    """Check if the filename's extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and os.path.exists("static/" + path):
        return send_from_directory('static', path)
    else:
        return render_template("index.html")


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
    return {'files': files, 'total': total, 'used': used, 'free': free}  # Send a JSON response containing the files.
    """Show the space in the temporary directory & space used"""

    


@app.route('/files/<filename>', methods=['GET'])
def get_file(filename):
    safe_filename = secure_filename(filename)
    if not os.path.exists(os.path.join(temp_dir, safe_filename)):
        abort(404)
    return send_from_directory(temp_dir, safe_filename)


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
