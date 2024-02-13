import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import '../index.css';
import BlobGroup from './BlobGroup';

type EditGrantProjectProps = {
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
    submitted: boolean,
    children: ReactNode;
    open: boolean;
    onClose: () => void;
    updateGrantProject: (_id: string, updatedNpoName: string, updatedNpoURL: string, updatedBackgroundImage: string, updatedGrantProjectName: string, updatedGrantURL: string, upadedDescription: string, updatedGrantorName: string, updatedGrantorURL: string, updatedTag1: string, updatedTag2: string, updatedTag3: string, updatedTag4: string, updatedSubmitted: boolean) => void;
}

export const EditGrantProject = ({ _id, npoName, npoURL, backgroundImage, grantProjectName, grantURL, description, grantorName, grantorURL, blobContainer, tag1, tag2, tag3, tag4, submitted, children, open, onClose, updateGrantProject }: EditGrantProjectProps, ) => {
    const [updatedBackgroundImage, setUpdatedBackgroundImage] = useState(backgroundImage);
    const [updatedNpoName, setUpdatedNpoName] = useState(npoName);
    const [updatedNpoURL, setUpdatedNpoURL] = useState(npoName);
    const [updatedGrantProjectName, setUpdatedGrantProjectName] = useState(grantProjectName);
    const [updatedGrantURL, setUpdatedGrantURL] = useState(grantURL);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedGrantorName, setUpdatedGrantorName] = useState(grantorName);
    const [updatedGrantorURL, setUpdatedGrantorURL] = useState(grantorURL);
    const [updatedBlobContainer, setUpdatedBlobContainer] = useState(blobContainer);
    const [updatedTag1, setUpdatedTag1] = useState(tag1);
    const [updatedTag2, setUpdatedTag2] = useState(tag2);
    const [updatedTag3, setUpdatedTag3] = useState(tag3);
    const [updatedTag4, setUpdatedTag4] = useState(tag4);
    const [updatedSubmitted, setupdatedSubmitted] = useState(submitted);
    console.log('grantor URL: ', updatedGrantorURL)

    const ref = useRef<HTMLDialogElement>(null);

    useLayoutEffect(() => {
        const closeListenerFnc = () => {
            onClose && onClose();
        };

        const dialogRef = ref.current;
        dialogRef?.addEventListener('close', closeListenerFnc);

        return () => {
            dialogRef?.removeEventListener('close', closeListenerFnc);
        };
    }, [onClose]);

    useLayoutEffect(() => {
        if (open && !ref.current?.open) {
            ref.current?.showModal();
        } else if (!open && ref.current?.open) {
            ref.current?.close();
        }
    }, [open]);

    return (
        <dialog className="p-5" ref={ref}>
            {children}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Hello from form submit');
                    console.log(_id, updatedGrantorURL)
                    updateGrantProject(_id, updatedNpoName, updatedNpoURL, updatedBackgroundImage, updatedGrantProjectName, updatedGrantURL, updatedDescription, updatedGrantorName, updatedGrantorURL, updatedTag1, updatedTag2, updatedTag3, updatedTag4, updatedSubmitted);
                }}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Update Grant Project</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Provide details on your grant application project here.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="npoName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nonprofit Organization Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="npoName"
                                            id="npoName"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={updatedNpoName}
                                            onChange={(e) => {setUpdatedNpoName(e.target.value)}}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="grantProjectName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Grant Project Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="grantProjectName"
                                            id="grantProjectName"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={updatedGrantProjectName}
                                            onChange={(e) => {setUpdatedGrantProjectName(e.target.value)}}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                                    Grant Project Tags (separate with commas)
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="tags"
                                            id="tags"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={updatedTag1}
//                                            onChange={(e) => {setUpdatedTags(e.target.value)}}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Grant Project Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={updatedDescription}
                                        onChange={(e) => {setUpdatedDescription(e.target.value)}}
                                    />
                                </div>
                            </div>
                            {/*
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            */}
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Documents
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">TXT, DOC, or PDF</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Grantor Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">...</p>

                        <div className="sm:col-span-4">
                            <label htmlFor="grantorName" className="block text-sm font-medium leading-6 text-gray-900">
                                Grantor Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="grantorName"
                                        id="grantorName"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={updatedGrantorName}
                                        onChange={(e) => {setUpdatedGrantorName(e.target.value)}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="grantorURL" className="block text-sm font-medium leading-6 text-gray-900">
                                Grantor Website
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="grantorURL"
                                        id="grantorURL"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={updatedGrantorURL}
                                        onChange={(e) => {setUpdatedGrantorURL(e.target.value)}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="grantURL" className="block text-sm font-medium leading-6 text-gray-900">
                                Grant Application URL
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="grantURL"
                                        id="grantURL"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={updatedGrantURL}
                                        onChange={(e) => {setUpdatedGrantURL(e.target.value)}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*}
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                            Comments
                                        </label>
                                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                            Candidates
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-gray-900">
                                            Offers
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                        Everything
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Same as email
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                */}

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </dialog >
    );
};