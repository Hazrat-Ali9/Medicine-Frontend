import { useQuery } from '@tanstack/react-query';
import useAuthContext from '../Components/hooks/useAuthContext';
import useAxios from './useAxios';

const useCarts = () => {
    const { user } = useAuthContext(); // AuthContext থেকে user পাবেন
    const axiosSecure = useAxios(); // ফাংশন হিসেবে কল করুন
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart', user?.email], // কুই এর কী
        queryFn: async () => {
            if (!user?.email) return []; // যদি user.email না থাকে, ফাঁকা অ্যারে ফেরত দিন
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data; // ডেটা ফেরত দিন
        },
        enabled: !!user?.email, // শুধুমাত্র যখন user.email থাকবে তখন কুই চলবে
    });
    return [cart, refetch];
};

export default useCarts;
