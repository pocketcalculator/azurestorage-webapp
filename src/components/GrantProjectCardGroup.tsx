import GrantProjectCard from "./GrantProjectCard";
import { useEffect, useState } from "react";
import NewGrantProjectCard from "./NewGrantProjectCard";

const GRANTAPI_URL = '/api/grants';

type GrantProjectGroupProps = {
    _id: string,
    npoName: string,
    npoURL: string,
    backgroundImage: string,
    grantProjectName: string,
    grantURL: string,
    description: string,
    grantorName: string,
    grantorURL: string,
    blobContainer: string,
    tag1: string,
    tag2: string,
    tag3: string,
    tag4: string,
    submitted: Boolean
}

export default function GrantProjectCardGroup() {
    const [grantProjects, setGrantProjects] = useState<GrantProjectGroupProps[]>([]);

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

    useEffect(() => {
        fetchGrantProjects();
    }, []);

    function updateExistingGrantProjectToDB(_id: string, updatedNpoName: string, updatedNpoURL: string, updatedBackgroundImage: string, updatedGrantProjectName: string, updatedGrantURL: string, updatedDescription: string, updatedGrantorName: string, updatedGrantorURL: string, updatedTag1: string, updatedTag2: string, updatedTag3: string, updatedTag4: string, updatedSubmitted: boolean) {
        console.log('hello from GrantProjectGroup.tsx');
        console.log('id: ', _id, ' ', updatedNpoName, ' ', updatedBackgroundImage, ' ', updatedGrantProjectName, ' ', updatedGrantURL, ' ', updatedDescription, ' ', updatedGrantorName, ' ', updatedGrantorURL, ' ', updatedTag1, ' ', updatedTag2, ' ', updatedTag3, ' ', updatedTag4, ' ', updatedSubmitted);
    };

    const saveNewGrantProjectToDB = async (npoName: string, npoURL: string, backgroundImage: string, grantProjectName: string, grantURL: string, description: string, grantorName: string, grantorURL: string, tag1: string, tag2: string, tag3: string, tag4: string) => {
        console.log('saveNewGrantProjectToDB run from GrantProjectGroup.tsx');
        console.log(npoName, ' ', backgroundImage, ' ', grantProjectName, ' ', grantURL, ' ', description, ' ', grantorName, ' ', grantorURL, ' ', tag1);
        const request = { npoName, backgroundImage, grantProjectName, grantURL, description, grantorName, grantorURL, tag1 };
        try {
            await fetch(`${GRANTAPI_URL}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request)
            });
            console.log('posted');
        } catch (e: any) {
            console.log(e);
            return;
        }
    };

    return (
        <>
            {/*grantProjects.length === 0 && <NewGrantProjectCard />*/}
            {grantProjects.map(item =>
                <GrantProjectCard updateGrantProject={updateExistingGrantProjectToDB} {...item} />
            )}
            <NewGrantProjectCard saveNewGrantProjectToDB={saveNewGrantProjectToDB} />
        </>
    )
}