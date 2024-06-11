import { useCallback, useState } from "react";
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
} from "react-icons/bs";

type DropzoneProps = {
  className?: string;
  acceptedFiles?: Array<string>;
};

function Dropzone({ className }: DropzoneProps) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles: DropzoneProps) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

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
          console.log(file.type);
          const Icon = getFileTypeIcon(file.type);
          return (
            <li key={file.name}>
              {Icon && <Icon className="h-10 w-10" />}
              {file.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropzone;
