import GrantProject from "./GrantProject";
import { useEffect, useState } from "react";
import NewGrantProject from "./NewGrantProject";

const GRANTAPI_URL = '/api/grants';

type GrantProjectGroupProps = {
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
    const [grantProjects, setGrantProjects] = useState<GrantProjectGroupProps[]>([]);

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

    function updateGrantProject(id: number, updatedNpoName: string, updatedBackgroundImage: string, updatedGrantProjectName: string, updatedGrantURL: string, upadedDescription: string, updatedGrantorName: string, updatedGrantorURL: string, updatedBlobContainer: string, updatedTags: string[], updatedStatus: boolean) {
        console.log('hello from GrantProjectGroup.tsx');
        console.log('id: ', id, ' ', updatedNpoName, ' ', updatedGrantProjectName, ' ', updatedGrantorURL, ' ', updatedGrantorName);
    };

    return (
        <>
            {grantProjects.length === 0 && <NewGrantProject />}
            {grantProjects.map(item =>
                <GrantProject updateGrantProject={updateGrantProject} {...item} />
            )}
            <NewGrantProject />
        </>
    )
}