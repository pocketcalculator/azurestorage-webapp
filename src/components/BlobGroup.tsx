import Blob from "./Blob";
import { useEffect, useState } from "react";
import '../index.css';

const BLOBAPI_URL = '/api/blobs';

interface Blob {
    etag: string;
    name: string;
    createdOn: string;
    contentLength: number;
    contentType: string
}

export default function BlobGroup() {
    const [error, setError] = useState();
    const [blobs, setBlobs] = useState<Blob[]>([]);

    useEffect(() => {
        const fetchBlobs = async () => {
            try {
                const response = await fetch(`${BLOBAPI_URL}/newcontainer`);
                const blobs = (await response.json()) as Blob[];
                setBlobs(blobs);
            } catch (e: any) {
                console.log(e);
                return;
            }

        };
        fetchBlobs();
    }, []);

    return (
        <>
            <h1>This is where the applicant files are shown.</h1>
            {blobs.length === 0 && <p>No documents found</p>}
            <ul className="list-group">
                {blobs.map(item => 
                    <li 
                        className="list-group-item" 
                        key={item.etag} 
                        onClick={() => console.log(item)}
                    >
                        <Blob name={item.name} contentType={item.contentType} createdOn={item.createdOn} contentLength={item.contentLength} />
                    </li>
                )}
            </ul>
        </>
    );
}

//export default BlobGroup;