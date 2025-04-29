const Loading = () => {
    const Skeleton = ({ className }) => {
        return (
            <div
                className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
            />
        );
    };

    return (
        <div className="p-4 w-full mx-auto rounded-lg shadow-sm bg-white max-h-screen overflow-y-hidden">
            <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="w-12 h-12 rounded-md" />
                <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <Skeleton className="h-32 w-full mb-2" />
            <Skeleton className="h-24 w-full mb-1" />
            <Skeleton className="h-12 w-5/6" />
        </div>
    );
};

export default Loading;
