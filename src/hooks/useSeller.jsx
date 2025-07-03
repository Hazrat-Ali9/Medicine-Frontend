import React from "react";
import useAuthContext from "../Components/hooks/useAuthContext";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useSeller = () => {
    const { user, loading } = useAuthContext();
    const axiosSecure = useAxios();

    const { data: isSeller = false, isLoading, error } = useQuery({
        queryKey: [user?.email, "isSeller"],
        enabled : !loading,
        queryFn: async () => {
            if (!user?.email) return false;
            try {
                const res = await axiosSecure.get(`/users/seller/${user.email}`);
                return res.data?.seller || false;
            } catch (err) {
                console.error("Error fetching seller status:", err);
                return false;
            }
        },
        // enabled: !!user?.email,
        // staleTime: 5 * 60 * 1000,
    });

    return [ isSeller, isLoading, error ]; // অ্যারে রিটার্নের পরিবর্তে অবজেক্ট রিটার্ন করা হয়েছে
};

export default useSeller;
