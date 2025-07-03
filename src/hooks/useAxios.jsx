import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../Components/hooks/useAuthContext";

const axiosSecure = axios.create({
    baseURL: 'https://medicine-server-ten.vercel.app'
})
const useAxios = () => {
    const navigate = useNavigate()
    const {logOut} = useAuthContext()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('amar ki token ache na ki', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    },
    function(error){
        return Promise.reject(error)
    }
    );
    axiosSecure.interceptors.response.use(function(response){
        return response
    },async(err)=>{
        const status = err.response.status
        console.log('eikne ki erro ashcche : ', status)
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(err)
    })
    return axiosSecure
};

export default useAxios;