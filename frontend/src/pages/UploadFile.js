import React, { useState } from 'react';
import { Stack, Text, PrimaryButton } from "@fluentui/react";
import { ProgressBar } from "@fluentui/react-components";

export default function UploadFile() {
  const [uploading, setUploading] = useState(false);

  const uploadFile = (event) => {
    event.preventDefault();
    setUploading(true); // Start uploading
    const files = event.target.elements.files.files; // Correct way to access files    const formData = new FormData();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]); // Append each file
    }
    
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      setUploading(false); // Stop uploading
    })
    .catch((error) => {
      console.error("Error:", error);
      setUploading(false); // Stop uploading on error
    });
  };
  

  return (
    <Stack
      tokens={{ childrenGap: 15 }}
      styles={{ root: { width: 'full', margin: "0 auto" } }}
    >
      <Text variant="large" styles={{ root: { fontWeight: "semibold" } }}>
        Upload Files
      </Text>
      <form onSubmit={uploadFile} encType="multipart/form-data">
      <input
  type="file"
  name="files" // Change this line
  id="file"
  multiple // Add this line
  className="border border-gray-300 rounded-md p-2 w-full"
/>

        <PrimaryButton className="" text="Upload File" type="submit" />
      </form>
      {uploading && <ProgressBar />}
    </Stack>
  );
}
