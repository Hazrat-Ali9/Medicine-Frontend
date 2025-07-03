import React from 'react';
import { FaCartPlus, FaPaypal, FaProductHunt } from 'react-icons/fa';
import useAuthContext from '../../../hooks/useAuthContext';  // Auth context
import useAxios from '../../../../hooks/useAxios';  // Axios hook for API requests
import { useQuery } from '@tanstack/react-query';  // React query for data fetching
import UserInformaiton from '../UserInformaiton/UserInformaiton';

const SellerHome = () => {
    const { user } = useAuthContext();  // Auth context for user info
    const axiosSecure = useAxios();  // Axios hook for secure API calls

    const emailEncoded = encodeURIComponent(user.email);  // URL encode email

    // React Query hook for fetching seller data
    const { data = {}, isLoading, error } = useQuery({
        queryKey: ['admin-stats-seller'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin-stats-seller/${emailEncoded}`); // Passing encoded email as URL parameter
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;  // Loading state
    if (error) return <p>Error loading data</p>;  // Error state

    return (
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4'>
                {/* Revenue Card */}
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-center p-5 rounded-md">
                    <h1 className='font-bold text-white text-2xl'>Revenue</h1>
                    <p className='text-xl font-semibold text-white flex items-center justify-center'>
                        <FaPaypal /> {data.revenue || 0}$
                    </p>
                </div>

                {/* Products Card */}
                <div className="bg-gradient-to-r from-blue-400 to-teal-500 p-5 rounded-md text-center">
                    <h1 className='font-bold text-white text-2xl'>Products</h1>
                    <p className='text-xl font-semibold text-white flex items-center gap-1 justify-center'>
                        <FaProductHunt /> {data.products || 0}
                    </p>
                </div>

                {/* Orders Card */}
                <div className="bg-gradient-to-r from-pink-400 to-blue-500 p-5 rounded-md text-center">
                    <h1 className='font-bold text-white text-2xl'>Orders</h1>
                    <p className='text-xl font-semibold text-white flex items-center justify-center gap-1'>
                        <FaCartPlus /> {data.orders || 0}
                    </p>
                </div>
            </div>
            <UserInformaiton></UserInformaiton>
        </div>
    );
};

export default SellerHome;
