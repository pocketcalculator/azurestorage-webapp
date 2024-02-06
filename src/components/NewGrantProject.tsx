import '../index.css';
import React, { useState } from 'react';
import NewsletterModal, { NewsletterModalData } from './NewsletterModal/NewsletterModal';

const NewGrantProject: React.FC = () => {
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
                    {newsletterFormData && newsletterFormData.email && (
                        <div className="msg-box">
                            <b>{newsletterFormData.email}</b> requested a <b>{newsletterFormData.digestType}</b> newsletter.
                        </div>
                    )}
                </div>
            </div>

        <NewsletterModal isOpen={isNewsletterModalOpen} onSubmit={handleFormSubmit} onClose={handleCloseNewsletterModal} />
        </>
    );
};

export default NewGrantProject;