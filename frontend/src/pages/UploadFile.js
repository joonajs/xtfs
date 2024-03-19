import { Stack, Text, PrimaryButton } from "@fluentui/react";

export default function UploadFile() {
  const uploadFile = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => alert(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Stack
      tokens={{ childrenGap: 15 }}
      styles={{ root: { width: 600, margin: "0 auto" } }}
    >
      <Text variant="large" styles={{ root: { fontWeight: "semibold" } }}>
        Upload Files
      </Text>
      <form onSubmit={uploadFile} encType="multipart/form-data">
        <input
          type="file"
          name="file"
          id="file"
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100"
        />
        <PrimaryButton text="Upload File" type="submit" />
      </form>
    </Stack>
  );
}
