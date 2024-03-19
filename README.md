# XTEMPS - Temporary File Server (TFS)

**XTEMPS** is a lightweight, secure, and user-friendly local file sharing solution designed for swift and ephemeral data exchange. XTEMPS TFS spins up a ghost server on your local machine or network, enabling seamless file sharing without the footprint. Perfect for team collaborations, quick file exchanges, or temporary workshops, TFS ensures your data is accessible where you need it and gone when you don't.

## Features

 - Ephemeral Storage: With TFS, your data is stored temporarily, ensuring that once the server shuts down, your shared files disappear, maintaining data privacy and security.
 - Easy Access: Accessible via any web browser within the same network, TFS provides a straightforward interface for uploading and downloading files.
 - Network Flexibility: Configure TFS to be accessible on your local machine or throughout your local network, tailoring the reach to your needs.
 - Secure Sharing: Basic security features ensure that your temporary file server isn't exposed to unintended users.
 - Simple Setup: With minimal configuration required, TFS is up and running in moments, ready to serve your file sharing needs.

## Getting Started
### Prerequisites
Ensure you have Python 3.x installed on your system. TFS uses Flask, so if you don't have Flask installed, you can install it via pip:
```
pip install Flask
```
### Installation
Clone the repository to your local machine:
```
git clone https://github.com/your-username/temporary-file-server.git
cd temporary-file-server
```
### Usage
**To start the server, run:**
```
python app.py
```
Once the server is running, navigate to http://localhost:9501 on your web browser to access the TFS dashboard. From there, you can upload files, view available files, and download as needed.
To stop the server and remove all temporary files, send a POST request to /shutdown or simply stop the Python process.

# Configuration
Modify app.py to change default configurations such as port number, host, and maximum file upload size to suit your needs.

# License
Distributed under the MIT License. See LICENSE for more information.

# Acknowledgments
- Flask, for the lightweight framework making this project possible
