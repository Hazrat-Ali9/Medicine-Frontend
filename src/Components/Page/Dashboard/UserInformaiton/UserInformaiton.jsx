import React from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const UserInformaiton = () => {
    const { user } = useAuthContext();   // ইউজারের ইমেইল পাওয়া যাচ্ছে
    const axiosSecure = useAxios();

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['users'],  // Query key সেট করা হয়েছে
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);  // API কল
            console.log(res.data);  // এখানে `res.data` লগ হবে, যা array হবে
            return res.data;  // রিটার্ন করা হচ্ছে array
        }
    });

    // লোডিং বা এরর থাকলে সেগুলো হ্যান্ডেল
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;
    if (products.length === 0) return <p>No user data found</p>;

    // প্রথম index থেকে ডাটা এক্সেস করা হচ্ছে
    const product = products[0];

    return (
        <div className='shadow-2xl mx-auto mt-10 '>
            <div className='flex '>
            <img src={product.image} className=' h-96 w-96' alt="" />
            <div>
            <h2 className='font-bold text-3xl px-5'>User Name: {product.name}</h2>
            <p className='px-5 pt-2  text-lg'>Email: {product.email}</p>
            <p className='px-5 pt-2 pb-4 text-xl font-bold'>Role : {product.role}</p>
            </div>
            </div>
        </div>
    );
};

export default UserInformaiton;
