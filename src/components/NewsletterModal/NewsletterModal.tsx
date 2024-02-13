import React, { useState, useEffect, useRef } from 'react';
import './NewsletterModal.css';
import Modal from '../Modal/Modal';

export interface NewsletterModalData {
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

const initialNewsletterModalData: NewsletterModalData = {
  npoName: 'Nonprofit Organization Name',
  npoURL: 'Nonprofit Website URL',
  backgroundImage: 'URL for Background Image',
  grantProjectName: 'Grant Project Name',
  grantURL: 'Grant URL',
  description: 'Grant Project Description',
  grantorName: 'Grantor Name',
  grantorURL: 'Grantor Website',
  tag1: 'tag1',
  tag2: 'tag2',
  tag3: 'tag3',
  tag4: 'tag4',
  blobContainer: 'upload',
  submitted: false
};

interface NewsletterModalProps {
  isOpen: boolean;
  onSubmit: (data: NewsletterModalData) => void;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({
  onSubmit,
  isOpen,
  onClose,
}) => {

  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<NewsletterModalData>(
    initialNewsletterModalData
  );

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    onSubmit(formState);
    setFormState(initialNewsletterModalData);
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Update Grant Project</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide details on your grant application project here.
            </p>
            <div className="form-row">
              <label htmlFor="npoName">NPO Name</label>
              <input
                ref={focusInputRef}
                type="name"
                id="npoName"
                name="npoName"
                value={formState.npoName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="backgroundImage">Background Imagee</label>
              <input
                ref={focusInputRef}
                type="url"
                id="backgroundImage"
                name="backgroundImage"
                value={formState.backgroundImage}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="grantProjectName">Grant Project Name</label>
              <input
                ref={focusInputRef}
                type="name"
                id="grantProjectName"
                name="grantProjectName"
                value={formState.grantProjectName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="grantURL">Grant URL</label>
              <input
                ref={focusInputRef}
                type="url"
                id="grantURL"
                name="grantURL"
                value={formState.grantURL}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="description">Description</label>
              <input
                ref={focusInputRef}
                type="text"
                id="description"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="grantorName">Name of Grantor</label>
              <input
                ref={focusInputRef}
                type="text"
                id="grantorName"
                name="grantorName"
                value={formState.grantorName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="grantorURL">Grantor Website</label>
              <input
                ref={focusInputRef}
                type="url"
                id="grantorURL"
                name="grantorURL"
                value={formState.grantorURL}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="tags">Tags</label>
              <input
                ref={focusInputRef}
                type="text"
                id="tag1"
                name="tag1"
                value={formState.tag1}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewsletterModal;
