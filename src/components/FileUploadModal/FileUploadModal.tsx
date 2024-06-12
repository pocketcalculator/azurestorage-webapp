import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  BsFiletypeTxt,
  BsFiletypeXlsx,
  BsFiletypeXls,
  BsFiletypeCsv,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePpt,
  BsFiletypePptx,
  BsFiletypePdf,
  BsFiletypeMd,
  BsFileEarmark,
  BsXCircle
} from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

type DropzoneProps = {
  className?: string;
  acceptedFiles?: Array<string>;
  rejectedFiles?: Array<string>;
};

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles: DropzoneProps, rejectedFiles: DropzoneProps) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
    } 
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/*": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [],
      "application/vnd.ms-powerpoint": [],
      "application/pdf": [],
    },
    onDrop
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case "text/plain":
        return BsFiletypeTxt;
      case "text/markdown":
        return BsFiletypeMd;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return BsFiletypeXlsx;
      case "application/vnd.ms-excel":
        return BsFiletypeXls;
      case "text/csv":
        return BsFiletypeCsv;
      case "application/msword":
        return BsFiletypeDoc;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return BsFiletypeDocx;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return BsFiletypePptx;
      case "application/vnd.ms-powerpoint":
        return BsFiletypePpt;
      case "application/pdf":
        return BsFiletypePdf;
      default:
        /*return "Unknown file type"*/
        return BsFileEarmark;
    }
  };

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
        {files.map((file) => {
          const Icon = getFileTypeIcon(file.type);
          return (
            <li key={file.name}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <Icon
                  className="h-10 w-10"
                  onLoad={() => URL.revokeObjectURL(file.preview)}
                />
                <button
                  type="button"
                  className="w-7 h-7 flex justify-center items-center absolute -top-3 -right-3"
                  onClick={() => removeFile(file.name)}
                >
                  <TiDelete className="w-20 h-20 text-red-400" />
                </button>
              </div>
              <div>
                {file.name}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropzone;
