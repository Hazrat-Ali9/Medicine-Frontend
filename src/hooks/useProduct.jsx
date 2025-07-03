import React from 'react';
import useAuthContext from '../Components/hooks/useAuthContext';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useProduct = () => {
    const { user } = useAuthContext(); // AuthContext থেকে user পাবেন
    const axiosSecure = useAxios(); // ফাংশন হিসেবে কল করুন

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email], // কুই এর কী
        queryFn: async () => {
            if (!user?.email) return []; // যদি user.email না থাকে, ফাঁকা অ্যারে ফেরত দিন
            const res = await axiosSecure.get(`/products?email=${user.email}`);
            return res.data; // ডেটা ফেরত দিন
        },
        enabled: !!user?.email, // শুধুমাত্র যখন user.email থাকবে তখন কুই চলবে
    });

    return [products, refetch];
};

export default useProduct;
