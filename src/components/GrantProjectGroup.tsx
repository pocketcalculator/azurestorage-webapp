import GrantProject from "./GrantProject";
import { useEffect, useState } from "react";

const GRANTAPI_URL = '/api/grants';

interface GrantProject {
    id: number,
    npoName: string,
    backgroundImage: string,
    grantProjectName: string,
    grantURL: string,
    description: string,
    grantorName: string,
    grantorURL: string,
    blobContainer: string,
    tags: Array<string>,
    status: boolean
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
            {console.log(grantProjects.length + 1)}
            {grantProjects.length === 0 && <p>No documents found</p>}
                {grantProjects.map(item => 
                        <GrantProject id={item.id} npoName={item.npoName} backgroundImage={item.backgroundImage} grantProjectName={item.grantProjectName} grantURL={item.grantURL} description={item.description} grantorName={item.grantorName} grantorURL={item.grantorURL} blobContainer={item.blobContainer} tags={item.tags} status={item.status}/>
                )}
        </>
    )
}