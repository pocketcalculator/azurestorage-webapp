import '../index.css';
import React, { PropsWithChildren, useState } from 'react';
import NewsletterModal, { NewsletterModalData } from './NewsletterModal/NewsletterModal';

type NewGrantProjectProps = {
    saveNewGrantProjectToDB: (npoName: string, npoURL: string, backgroundImage: string, grantProjectName: string, grantURL: string, description: string, grantorName: string, grantorURL: string, tag1: string, tag2: string, tag3: string, tag4: string) => void;
}

function NewGrantProject({saveNewGrantProjectToDB}: NewGrantProjectProps) {
    const [isNewsletterModalOpen, setNewsletterModalOpen] = useState<boolean>(false);
    const [newsletterFormData, setNewsletterFormData] = useState<NewsletterModalData | null>(null);
    const backgroundImage = 'https://images.pexels.com/photos/955389/pexels-photo-955389.jpeg'

    const handleOpenNewsletterModal = () => {
        setNewsletterModalOpen(true);
    };

    const handleCloseNewsletterModal = () => {
        setNewsletterModalOpen(false);
    };

    const handleFormSubmit = (data: NewsletterModalData): void => {
        console.log(data);
        saveNewGrantProjectToDB(data.npoName, data.npoURL, data.backgroundImage, data.grantProjectName, data.grantURL, data.description, data.grantorURL, data.grantorURL, data.tag1, data.tag2, data.tag3, data.tag4);
        setNewsletterFormData(data);
        handleCloseNewsletterModal();
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleOpenNewsletterModal}>
                        Begin
                    </button>
                    {newsletterFormData && newsletterFormData.grantProjectName && (
                        <div className="msg-box">
                            <b>{newsletterFormData.grantProjectName}</b> requested a <b>{newsletterFormData.description}</b> newsletter.
                        </div>
                    )}
                </div>
            </div>

            <NewsletterModal isOpen={isNewsletterModalOpen} onSubmit={handleFormSubmit} onClose={handleCloseNewsletterModal} />
        </>
    );
};

export default NewGrantProject;