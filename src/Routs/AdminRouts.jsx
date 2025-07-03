import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuthContext from '../Components/hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const AdminRouts = ({ children }) => {
    const { user, loading } = useContext(AuthContext) // যদি এটি একটি অবজেক্ট রিটার্ন করে
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // লোডিং স্টেট দেখানোর সময়
    if (loading || isAdminLoading) {
        return (
            <div className='flex justify-center items-center'>
                <div aria-label="Loading..." role="status">
                    <svg className="h-12 w-12 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    </svg>
                </div>
            </div>
        );
    }

    // যদি ইউজার অ্যাডমিন হয়
    if (user && isAdmin) {
        return children;
    }

    // রিডাইরেক্ট টু লগইন পেজ
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRouts;
