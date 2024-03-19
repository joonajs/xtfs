import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import config from './config.dev';

function Home() {
  return <h1>Home Page</h1>;
}

function UploadFile() {
  const uploadFile = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Upload Files</h1>
      <form onSubmit={uploadFile} encType="multipart/form-data">
        <input type="file" name="file" id="file" />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

function ViewFiles() {
  const apiUrl = config.apiUrl;
  const [files, setFiles] = useState([]);

  const fetchFiles = () => {
    fetch('/files')
      .then(response => response.json())
      .then(data => setFiles(data.files))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h1>View Files</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={`${apiUrl}/files/${file}`} target="_blank" rel="noopener noreferrer">{file}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/upload">Upload Files</Link> | 
          <Link to="/files">View Files</Link>
        </nav>
        <Routes>
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/files" element={<ViewFiles />} />
          <Route path="/files/*" />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
