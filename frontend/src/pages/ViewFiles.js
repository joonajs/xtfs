import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Stack,
  Text,
  Separator,
  ActionButton,
  Link as FluentUILink,
  PrimaryButton,
} from "@fluentui/react";
import config from "../config.dev";

export default function ViewFiles() {
  const apiUrl = config.apiUrl;
  const [files, setFiles] = useState([]);
  const [total, setTotal] = useState(0);
  const [used, setUsed] = useState(0);
  const [free, setFree] = useState(0);

  useEffect(() => {
    fetch("/files")
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files);
        setTotal((data.total / 1024 ** 3).toFixed(2));
        setUsed((data.used / 1024 ** 3).toFixed(2));
        setFree((data.free / 1024 ** 3).toFixed(2));
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  

  return (
    <Stack
      tokens={{ childrenGap: 10 }}
      styles={{ root: { width: 600, margin: "0 auto" } }}
    >
      <Text variant="large" styles={{ root: { fontWeight: "semibold" } }}>
        View Files
      </Text>
      <Stack tokens={{ childrenGap: 5 }}>
        {files.map((file, index) => (
          <Stack
            key={index}
            horizontal
            tokens={{ childrenGap: 10 }}
            verticalAlign="center"
          >
            <FluentUILink href={`${apiUrl}/files/${file}`} target="_blank">
              {file}
            </FluentUILink>
            <ActionButton text="Download" />
<ActionButton 
  text="Delete" 
  onClick={() => fetch(`${apiUrl}/files/${file}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // If the deletion was successful, remove the file from the state
      setFiles(files.filter(f => f !== file));
    }
  })}
/>

          </Stack>
        ))}
      </Stack>
      <Separator />
      <Stack tokens={{ childrenGap: 5 }}>
        <Text>Total: {total} GB</Text>
        <Text>Used: {used} GB</Text>
        <Text>Free: {free} GB</Text>
      </Stack>
      <PrimaryButton>
        <RouterLink to="/upload" style={{ textDecoration: "none" }}>
          Upload Files
        </RouterLink>
      </PrimaryButton>
    </Stack>
  );
}
