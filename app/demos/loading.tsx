export default function DemosLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1E1E1E]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading demo...</p>
            </div>
        </div>
    );
}
