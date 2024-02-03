import GrantProject from "./GrantProject";
import { useEffect, useState } from "react";

const GRANTAPI_URL = '/api/grants';

type GrantProjectProps = {
    id: number,
    npoName: string,
    backgroundImage: string,
    grantProjectName: string,
    grantURL: string,
    description: string,
    grantorName: string,
    grantorURL: string,
    blobContainer: string,
    tags: string[],
    status: boolean
}

export default function GrantProjectGroup() {
    useEffect(() => {
        const fetchGrantProjects = async () => {
            try {
                const response = await fetch(`${GRANTAPI_URL}`);
                const grantProjects = (await response.json()) as [];
                setGrantProjects(grantProjects);
            } catch (e: any) {
                console.log(e);
                return;
            }
        };
        fetchGrantProjects();
    }, []);
    const [grantProjects, setGrantProjects] = useState<GrantProjectProps[]>([]);

    function updateGrantProject() {
        console.log('hello from GrantProjectGroup.tsx')
    };

    return (
        <>
            {grantProjects.length === 0 && <p>No documents found</p>}
                {grantProjects.map(item => 
                        <GrantProject updateGrantProject={updateGrantProject} {...item}/>
                )}
        </>
    )
}