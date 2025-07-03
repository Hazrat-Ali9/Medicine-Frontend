import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2'; // SweetAlert2 ইমপোর্ট
import registerImage from '../../../assets/login.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Google from '../Register/Google';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { loginUser, googleProvider } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'

    const handSubmitleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
            .then((res) => {
                // সফল লগইনের জন্য অ্যালার্ট দেখান
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back! You have successfully logged in.',
                });
                navigate(from, {replace: true})
            })
            .catch((err) => {
                setErrorMessage('Invalid email or password!');
                console.error(err);

                // ব্যর্থ লগইনের জন্য অ্যালার্ট দেখান
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                });
            });
    };

    

    return (
        <div className="font-[sans-serif] bg-white max-w-7xl mx-auto mt-20 lg:mt-10 w-11/12">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="max-md:order-1 p-4">
                    <img src={registerImage} className="lg:max-w-[85%] rounded-md w-full h-full object-contain block mx-auto" alt="login-image" />
                </div>
                <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
                    <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                        <div className="text-center mb-12">
                            <h1 className="font-bold text-3xl">MedlinePlus</h1>
                        </div>
                        <form onSubmit={handSubmitleLogin} className="max-w-md w-full">
                            <div className="space-y-4">
                                <div>
                                    <input name="email" type="email" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Email address" />
                                </div>
                                <div>
                                    <input name="password" type="password" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Password" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-sm mt-5">
                                    Haven't you already created an account? <Link to={'/register'} className="underline text-green-400">Register Now</Link>
                                </h1>
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
                            )}
                            <div className="mt-8">
                                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Log in
                                </button>
                            </div>
                            <div className="my-4 flex items-center gap-4">
                                <hr className="w-full border-gray-300" />
                                <p className="text-sm text-gray-800 text-center">or</p>
                                <hr className="w-full border-gray-300" />
                            </div>
                            {/*  */}
                            <Google title={'Login'}></Google>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
