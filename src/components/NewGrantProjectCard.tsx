import React, { PropsWithChildren, useState } from 'react';
import Form from './GrantProjectQuestions/GrantProjectQuestions';
import NewGrantProjectModal, { NewGrantProjectModalData } from './NewGrantProjectModal/NewGrantProjectModal';
import { Button } from './Button';
import '../index.css';



type NewGrantProjectProps = {
    saveNewGrantProjectToDB: (npoName: string, npoURL: string, backgroundImage: string, grantProjectName: string, grantURL: string, description: string, grantorName: string, grantorURL: string, tag1: string, tag2: string, tag3: string, tag4: string) => void;
}

function NewGrantProject({saveNewGrantProjectToDB}: NewGrantProjectProps) {
    const [isNewGrantProjectModalOpen, setNewGrantProjectModalOpen] = useState<boolean>(false);
    const [newsletterFormData, setNewsletterFormData] = useState<NewGrantProjectModalData | null>(null);
    const backgroundImage = 'https://images.pexels.com/photos/955389/pexels-photo-955389.jpeg'

    const handleOpenNewsletterModal = () => {
        setNewGrantProjectModalOpen(true);
    };

    const handleCloseNewGrantProjectModal = () => {
        setNewGrantProjectModalOpen(false);
    };

    const handleFormSubmit = (data: NewGrantProjectModalData): void => {
        console.log(data);
        saveNewGrantProjectToDB(data.npoName, data.npoURL, data.backgroundImage, data.grantProjectName, data.grantURL, data.description, data.grantorName, data.grantorURL, data.tag1, data.tag2, data.tag3, data.tag4);
        setNewsletterFormData(data);
        handleCloseNewGrantProjectModal();
    };

    return (
        <>
            <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
                <div className="max-h-64 max-w-96">
                    <img className="object-fill h-64 w-96 grayscale" src={backgroundImage} alt="" />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Start A New Grant Project</div>
                </div>
                <div className="flex justify-center space-x-4">
                    <Button onClick={handleOpenNewsletterModal}>
                        Begin
                    </Button>
                    {newsletterFormData && newsletterFormData.grantProjectName && (
                        <div className="msg-box">
                            <b>{newsletterFormData.grantProjectName}</b> requested a <b>{newsletterFormData.description}</b> newsletter.
                        </div>
                    )}
                </div>
            </div>

            <NewGrantProjectModal isOpen={isNewGrantProjectModalOpen} onSubmit={handleFormSubmit} onClose={handleCloseNewGrantProjectModal} />
            <Form />
        </>
    );
};

export default NewGrantProject;