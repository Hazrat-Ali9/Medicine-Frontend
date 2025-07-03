import axios from 'axios';

const axiosPublic = axios.create({
    baseURL : `https://medicine-server-ten.vercel.app`
})
const useSecurePublic = () => {
    return axiosPublic
};

export default useSecurePublic;