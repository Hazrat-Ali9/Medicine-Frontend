import React from 'react';
import useAuthContext from '../Components/hooks/useAuthContext';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useSellerPaymentsHistory = () => {
    const { user } = useAuthContext(); // AuthContext থেকে user পাবেন
    const axiosSecure = useAxios(); // ফাংশন হিসেবে কল করুন

    const { data: paymentsHistory = [], refetch } = useQuery({
        queryKey: ['paymentsHistory', user?.email], // কুই এর কী
        queryFn: async () => {
            if (!user?.email) return []; // যদি user.email না থাকে, ফাঁকা অ্যারে ফেরত দিন
            const res = await axiosSecure.get(`/payments`);
            return res.data; // ডেটা ফেরত দিন
        },
    });

    return [paymentsHistory, refetch];
};

export default useSellerPaymentsHistory;