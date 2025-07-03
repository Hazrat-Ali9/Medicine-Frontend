import React from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaCartPlus, FaPaypal, FaUser } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa6';
import UserInformaiton from '../UserInformaiton/UserInformaiton';

const AdminHome = () => {
    const { user } = useAuthContext();
    const axiosSecure = useAxios();

    const { data = {}, isLoading, error } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
        <div>
            <h1 className='font-bold text-3xl'>Hi, Welcome {user.displayName}</h1>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4'>
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-center p-5 rounded-md">
                    <h1 className='font-bold text-white text-2xl'>Revenue</h1>
                    <p className='text-xl font-semibold text-white flex items-center justify-center'>
                        <FaPaypal /> {data.revenue || 0}$
                    </p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-teal-500 p-5 rounded-md text-center">
                    <h1 className='font-bold text-white text-2xl'>Products</h1>
                    <p className='text-xl font-semibold text-white flex items-center gap-1 justify-center'>
                        <FaProductHunt /> {data.products || 0}
                    </p>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-5 rounded-md text-center">
                    <h1 className='font-bold text-white text-2xl'>Users</h1>
                    <p className='text-xl font-semibold text-white flex items-center gap-1 justify-center'>
                        <FaUser /> {data.users || 0}
                    </p>
                </div>
                <div className="bg-gradient-to-r from-pink-400 to-blue-500 p-5 rounded-md text-center">
                    <h1 className='font-bold text-white text-2xl'>Orders</h1>
                    <p className='text-xl font-semibold text-white flex items-center justify-center gap-1'>
                        <FaCartPlus /> {data.orders || 0}
                    </p>
                </div>
            </div>
            <div>
                <UserInformaiton></UserInformaiton>
            </div>
        </div>
    );
};

export default AdminHome;
