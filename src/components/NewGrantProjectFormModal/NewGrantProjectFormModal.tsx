import React, { useState, useEffect, useRef } from "react";
/*import './NewGrantProjectModal.css';*/
import "../../index.css";
import Modal from "../Modal/Modal";
import { Button } from "../Button";
import FileUploadModal from "../FileUploadModal/FileUploadModal";

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
  npoName: "",
  npoURL: "",
  backgroundImage: "",
  grantProjectName: "",
  grantURL: "",
  description: "",
  grantorName: "",
  grantorURL: "",
  tag1: "",
  tag2: "",
  tag3: "",
  tag4: "",
  blobContainer: "",
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
              <div className="sm:col-span-6">
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
                  placeholder="Nonprofit Organization Name"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  value={formState.npoName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="npoURL"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  NPO URL
                </label>
                <input
                  ref={focusInputRef}
                  type="url"
                  id="npoURL"
                  name="npoURL"
                  placeholder="NPO Website URL"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  value={formState.npoURL}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="backgroundImage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Background Image
                </label>
                <input
                  ref={focusInputRef}
                  type="url"
                  id="backgroundImage"
                  name="backgroundImage"
                  placeholder="Background Image URL"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm leading-6 border-b border-gray-500"
                  value={formState.backgroundImage}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="grantProjectName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Grant Project Name
                </label>
                <input
                  ref={focusInputRef}
                  type="text"
                  id="grantProjectName"
                  name="grantProjectName"
                  placeholder="Grant Project Name"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm leading-6 border-b border-gray-500"
                  value={formState.grantProjectName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="grantURL"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Grant URL
                </label>
                <input
                  ref={focusInputRef}
                  type="url"
                  id="grantURL"
                  name="grantURL"
                  placeholder="Grant Application URL"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm leading-6 border-b border-gray-500"
                  value={formState.grantURL}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <textarea
                  ref={focusInputRef}
                  id="description"
                  name="description"
                  placeholder="Enter a description of your grant project."
                  rows={4}
                  className="mt-1 block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  value={formState.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="grantorName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name of Grantor
                </label>
                <input
                  ref={focusInputRef}
                  type="text"
                  id="grantorName"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  name="grantorName"
                  placeholder="Name of Grantor"
                  value={formState.grantorName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="grantorURL"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Grantor Website
                </label>
                <input
                  ref={focusInputRef}
                  type="url"
                  id="grantorURL"
                  name="grantorURL"
                  placeholder="Grantor Website URL"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm leading-6 border-b border-gray-500"
                  value={formState.grantorURL}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
            <div className="sm:col-span-6">
              <label
                htmlFor="tags"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tags
              </label>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <input
                  type="text"
                  id="tag1"
                  name="tag1"
                  placeholder="Tag 1"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  value={formState.tag1}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="tag2"
                  name="tag2"
                  placeholder="Tag 2"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  value={formState.tag2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <input
                  type="text"
                  id="tag3"
                  name="tag3"
                  placeholder="Tag 3"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  value={formState.tag3}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="tag4"
                  name="tag4"
                  placeholder="Tag 4"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-b border-gray-500"
                  value={formState.tag4}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <FileUploadModal/>
            </div>
            </div>
            <div className="flex justify-center space-x-4 mt-9">
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
