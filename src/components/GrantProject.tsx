import '../index.css';
import BlobGroup from './BlobGroup';

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
    tags: Array<string>,
    status: Boolean;
}

function GrantProject(props: GrantProjectProps) {
    const renderTags = props.tags.map((tag) => {
        return (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
        );
    });

    return (
        <>
            <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
                <div className="max-h-64 max-w-96">
                    <img className="object-fill h-64 w-96" src={props.backgroundImage} alt="" />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{props.id}. {props.grantProjectName}</div>
                    <div className="font-bold text-l mb-2">{props.grantorName}</div>
                    <div className="object-constrain h-24">
                        <p className="text-gray-700 text-base line-clamp-4">
                            {props.description}
                        </p>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    {renderTags}
                </div>
                <div className="flex justify-center space-x-4">
                    {!props.status ? (
                        <>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Edit
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Submit
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                                Submitted
                            </button>
                        </>
                    )}
                </div>
            </div>

        </>
    )
}

export default GrantProject;