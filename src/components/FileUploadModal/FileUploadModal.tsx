import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ className }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
    <div
      {...getRootProps({
        className: className,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>

    <ul>
      {files.map((file) => (
        
        <li key={file.name}>
          <img 
            src={file.preview} 
            alt={file.name}
            style={{ width: 100 }}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
          {file.name}</li>
      ))}
    </ul>
    </>
  );
}

export default Dropzone;
