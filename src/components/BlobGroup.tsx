import Blob from "./Blob";
import { useEffect, useState } from "react";

const BLOBAPI_URL = '/blob';

interface Blob {
    id: number;
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
                console.log(blobs);
                setBlobs(blobs);
            } catch (e: any) {
                console.log(e);
                return;
            }

        };
        fetchBlobs();
    }, []);
    /*
    let blobs = [
        {
            "name": "ebmujj5y92q01.jpg",
            "createdOn": "2023-10-25T04:32:32.000Z",
            "contentLength": 655381,
            "contentType": "image/jpeg"
        },
        {
            "name": "testfilesend.txt",
            "createdOn": "2023-10-26T04:50:43.000Z",
            "contentLength": 0,
            "contentType": "application/octet-stream"
        },
        {
            "name": "testfilesend2.txt",
            "createdOn": "2023-10-26T05:00:05.000Z",
            "contentLength": 0,
            "contentType": "application/octet-stream"
        },
        {
            "name": "user-submitted-background-64.jpg",
            "createdOn": "2023-09-19T03:47:00.000Z",
            "contentLength": 838473,
            "contentType": "image/jpeg"
        }
    ]
    */

    return (
        <>
            <h1>This is where the applicant files are shown.</h1>
            {blobs.length === 0 && <p>No documents found</p>}
            <ul className="list-group">
                {blobs.map(item => 
                    <li 
                        className="list-group-item" 
                        key={item.id} 
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