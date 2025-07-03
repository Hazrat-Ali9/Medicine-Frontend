import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import useSecurePublic from '../../../hooks/useSecurePublic';
import { useNavigate } from 'react-router-dom';

const Google = ({title}) => {
    const {  googleProvider } = useContext(AuthContext);
    const Navigate = useNavigate()
    const userSecurePublic = useSecurePublic()
    const handleGoogleLogin = async () => {
        try {
            const result = await googleProvider();
            console.log("🎉 Google Login Successful:", result.user);
            const userInfo = {
                email : result.user?.email,
                name : result.user?.displayName,
                image : result.user?.photoURL
            }
            userSecurePublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data)
                Navigate('/')
            })
            // গুগল লগইনের জন্য অ্যালার্ট দেখান
            Swal.fire({
                icon: 'success',
                title: 'Google Login Successful',
                text: 'You have successfully logged in with Google.',
            });
        } catch (error) {
            console.error("❌ Google Login Error:", error.message);

            // গুগল লগইন ব্যর্থ হলে অ্যালার্ট দেখান
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: 'Something went wrong. Please try again later.',
            });
        }
    };
    return (
        <div>
            <div className="space-x-6 flex justify-center">
                <button
                    type="button"
                    onClick={() => handleGoogleLogin()} // Google login ফাংশন কল করা
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512" fill="#fff">
                        <path d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                        <path d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                        <path d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                        <path d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                    </svg>
                    {`${title} with Google`}
                </button>
            </div>
        </div>
    );
};

export default Google;