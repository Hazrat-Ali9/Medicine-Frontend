import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuthContext from "../Components/hooks/useAuthContext";
// Use admin
const useAdmin = () => {
    const { user, loading } = useAuthContext();
    const axiosSecure = useAxios();

    const { data: isAdmin = false } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled : !loading,
        queryFn: async () => {
            if (!user?.email) return false; // যদি email না থাকে, তাহলে false রিটার্ন করো।
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log("Admin Status:", res.data.admin);
            return res.data?.admin || false; // ডিফল্ট ভ্যালু false রাখো।
        },
        // enabled: !!user?.email, // শুধুমাত্র user.email থাকলে API কল হবে।
        // staleTime: 5 * 60 * 1000, // ৫ মিনিট পর্যন্ত ডাটা ক্যাশ থাকবে।
    });

    return [isAdmin];
};

export default useAdmin;
