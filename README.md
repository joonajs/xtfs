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
```
pip install Flask-Cors
```
### Installation
Clone the repository to your local machine:
```
git clone https://github.com/joonajs/xtfs.git &&
cd xtfs
```
### Usage
**To start the backend server, run:**
```
python backend/app/main.py
```

### You don't need to spin up the React server if not wanted.
You can access everything needed from your local IP or localhost:9501, starting the React server is only suggested if you plan to keep the server up for longer than few minutes to exchange files.
You can then install the React server in ```/frontend``` and access the **XTFS** from localhost:3000
From there, you can upload files, view available files, and download as needed.
To stop the server and remove all temporary files, send a POST request to /shutdown or simply stop the Python process.

**Remember** to change the config file to include your own network IP address correctly:
```
const config = {
  apiUrl: "http://useyourlocalip:9501",
};
export default config;
```

# Configuration
Modify app.py to change default configurations such as port number, host, and maximum file upload size to suit your needs.

# License
Distributed under the MIT License. See LICENSE for more information.

# Acknowledgments
- Flask, for the lightweight framework making this project possible
