import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='w-11/12 mx-auto flex flex-col h-screen justify-center items-center '>
            <div class="flex flex-col items-center bg-white md:shadow-xl md:p-32 rounded-md">
                <h1 class="text-[120px] font-extrabold text-gray-700">404</h1>
                <p class="text-2xl font-medium text-gray-600 mb-6">Page Not Found</p>
                <Link to={'/'}
                    class="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;