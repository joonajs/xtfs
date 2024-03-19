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
                      'json',}
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
    """Handle file upload."""
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(temp_dir, filename)
        file.save(filepath)
        return 'File uploaded successfully', 200
    return 'File type not allowed', 400

@app.route('/files', methods=['GET'])
def list_files():
    """List all files in the temporary directory."""
    files = os.listdir(temp_dir)
    return {'files': files}  # Send a JSON response containing the files.


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
