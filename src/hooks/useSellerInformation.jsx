import React from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useSellerInformation = () => {
    const axiosSecure = useAxios(); // Secure axios instance

    // সব সেলারদের তথ্য ফেচ করার কুই
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['allSellers'], // Unique query key
        queryFn: async () => {
            const res = await axiosSecure.get('/users/sellers'); // সব সেলারদের API কল
            return res.data; // API থেকে ডেটা ফেরত দিবে
        }
    });

    return [sellers, refetch]; // সেলারদের ডাটা ও রিফ্রেশ ফাংশন রিটার্ন
};

export default useSellerInformation;