import Blob from "./Blob";

function BlobGroup() {
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

    return (
        <>
            <h1>This is where the applicant files are shown.</h1>
            {blobs.length === 0 && <p>No documents found</p>}
            <ul className="list-group">
                {blobs.map(item => 
                    <li 
                        className="list-group-item" 
                        key={item} 
                        onClick={() => console.log(item)}
                    >
                        <Blob name={item.name} contentType={item.contentType} createdOn={item.createdOn} contentLength={item.contentLength} />
                    </li>
                )}
            </ul>
        </>
    );
}

export default BlobGroup;