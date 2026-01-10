import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found | OU BERHAYLA',
    description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1E1E1E] px-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-9xl font-black text-orange-500 mb-4">
                    404
                </h1>
                
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                    Page Not Found
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <button className="px-8 py-4 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors">
                            Go home
                        </button>
                    </Link>
                    
                    <Link href="/projects">
                        <button className="px-8 py-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                            View projects
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
