import '../index.css';

type GrantProjectProps = {
    id: number,
    npoName: string,
    grantProjectName: string,
    description: string,
    url: string,
    blobContainer: string
}

function GrantProject(props: GrantProjectProps) {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{props.id}. {props.grantProjectName}</div>
                    <p className="text-gray-700 text-base">
                        {props.description}
                    </p>
                    <p>
                        {props.url}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{props.npoName}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#environment</span>
                </div>
            </div>
        </>
    )
}

export default GrantProject;