//Not yet implemented, this components displays details for each file.  Called by BlobGroup component.
import '../index.css';

type BlobProps = {
    name: string;
    createdOn: string;
    contentLength: number;
    contentType: string
}

function Blob(props: BlobProps) {
    return (
        <>
            <h4 >{props.name}</h4>
            <p>createdOn: {props.createdOn}</p>
            <p>contentLength: {props.contentLength}</p>
            <p>contentType: {props.contentType}</p>
        </>
    )
}

export default Blob;