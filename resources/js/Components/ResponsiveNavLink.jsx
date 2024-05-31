import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-[#C19B5C] dark:border-indigo-600 dark:text-indigo-300 bg-[#e3d1b5] dark:bg-indigo-900/50 focus:text-gray-900 dark:focus:text-indigo-200 focus:bg-[#DDC8A6] dark:focus:bg-indigo-900  dark:focus:border-indigo-300'
                    : 'border-transparent text-gray-700 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-[#e3d1b5] dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
            
        >
            {children}
        </Link>
    );
}
