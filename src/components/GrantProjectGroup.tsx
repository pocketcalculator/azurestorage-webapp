import GrantProject from "./GrantProject";
import { useEffect, useState } from "react";

const GRANTAPI_URL = '/api/grants';

interface GrantProject {
    id: number,
    npoName: string,
    grantProjectName: string,
    description: string,
    url: string,
    blobContainer: string   
}

export default function GrantProjectGroup() {
    const [error, setError] = useState();
    const [grantProjects, setGrantProjects] = useState<GrantProject[]>([]);
    
    useEffect(() => {
        const fetchGrantProjects = async () => {
            try {
                const response = await fetch(`${GRANTAPI_URL}`);
                const grantProjects = (await response.json()) as GrantProject[];
                setGrantProjects(grantProjects);
            } catch (e: any) {
                console.log(e);
                return;
            }

        };
        fetchGrantProjects();
    }, []);

    return (
        <>
            {grantProjects.length === 0 && <p>No documents found</p>}
            <ul className="list-group">
                {grantProjects.map(item => 
                    <li 
                        className="list-group-item" 
                        key={item.id} 
                        onClick={() => console.log(item)}
                    >
                        <GrantProject id={item.id} npoName={item.npoName} grantProjectName={item.grantProjectName} description={item.description} url={item.url} blobContainer={item.blobContainer} />
                    </li>
                )}
            </ul>
        </>
    )
}