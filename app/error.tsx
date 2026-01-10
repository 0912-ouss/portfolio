'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error reporting service in production
        if (process.env.NODE_ENV === 'production') {
            // TODO: Add error logging service (e.g., Sentry)
            console.error('Application error:', error);
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1E1E1E] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl mx-auto"
            >
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-9xl font-black text-orange-500 mb-4"
                >
                    500
                </motion.h1>
                
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                    Something went wrong!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    We encountered an unexpected error. Don't worry, our team has been notified.
                </p>

                {error.digest && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-8 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={reset}
                        className="px-8 py-4 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors"
                    >
                        Try again
                    </motion.button>
                    
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                        >
                            Go home
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
