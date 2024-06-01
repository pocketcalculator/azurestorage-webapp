import React, { useState, useEffect, useRef } from "react";
/*import './NewGrantProjectModal.css';*/
import "../../index.css";
import Modal from "../Modal/Modal";
import { Button } from "../Button";

export interface NewGrantProjectModalData {
  npoName: string;
  npoURL: string;
  backgroundImage: string;
  grantProjectName: string;
  grantURL: string;
  description: string;
  grantorName: string;
  grantorURL: string;
  blobContainer: string;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  submitted: Boolean;
}

const initialNewGrantProjectModalData: NewGrantProjectModalData = {
  npoName: "Nonprofit Organization Name",
  npoURL: "Nonprofit Website URL",
  backgroundImage: "URL for Background Image",
  grantProjectName: "Grant Project Name",
  grantURL: "Grant URL",
  description: "Grant Project Description",
  grantorName: "Grantor Name",
  grantorURL: "Grantor Website",
  tag1: "tag1",
  tag2: "tag2",
  tag3: "tag3",
  tag4: "tag4",
  blobContainer: "upload",
  submitted: false,
};

interface NewGrantProjectModalProps {
  isOpen: boolean;
  onSubmit: (data: NewGrantProjectModalData) => void;
  onClose: () => void;
}

const NewGrantProjectModal: React.FC<NewGrantProjectModalProps> = ({
  onSubmit,
  isOpen,
  onClose,
}) => {
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<NewGrantProjectModalData>(
    initialNewGrantProjectModalData
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
    setFormState(initialNewGrantProjectModalData);
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Grant Project Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide details on your grant project here.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="npoName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nonprofit Organization Name
                </label>
                <input
                  ref={focusInputRef}
                  type="name"
                  id="npoName"
                  name="npoName"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  value={formState.npoName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="npoURL">NPO URL</label>
              <input
                ref={focusInputRef}
                type="url"
                id="npoURL"
                name="npoURL"
                value={formState.npoURL}
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
              />
            </div>
            <div className="form-row">
              <label htmlFor="grantProjectName">Grant Project Name</label>
              <input
                ref={focusInputRef}
                type="text"
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
              <label htmlFor="tag1">Tag 1</label>
              <input
                ref={focusInputRef}
                type="text"
                id="tag1"
                name="tag1"
                value={formState.tag1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="tag2">Tag 2</label>
              <input
                ref={focusInputRef}
                type="text"
                id="tag2"
                name="tag2"
                value={formState.tag2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="tag3">Tag 3</label>
              <input
                ref={focusInputRef}
                type="text"
                id="tag3"
                name="tag3"
                value={formState.tag3}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="tag4">Tag 4</label>
              <input
                ref={focusInputRef}
                type="text"
                id="tag4"
                name="tag4"
                value={formState.tag4}
                onChange={handleInputChange}
              />
            </div>
            <div className="max-h-max max-w-max">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    TXT, DOC, or PDF
                  </p>
                </div>
              </div>
            </div>
            <div className="form-row flex">
              <Button onClick={onClose}>Cancel</Button>
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewGrantProjectModal;
