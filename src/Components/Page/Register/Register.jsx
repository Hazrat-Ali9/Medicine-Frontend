import React, { useContext, useState } from "react";
import registerImage from "../../../assets/retister.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import useSecurePublic from "../../../hooks/useSecurePublic";
import Google from "./Google";

const Register = () => {
    const [isChecked, setIsChecked] = useState(false); // চেকবক্স স্টেট
    const [error, setError] = useState(""); // ত্রুটি বার্তা স্টেট
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useSecurePublic();
    const navigate = useNavigate()

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setError(""); // ত্রুটি বার্তা মুছে ফেলা
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const url = e.target.url.value;
        const role = e.target.role.value;

        if (!isChecked) {
            setError("You must accept the Terms and Conditions to continue.");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must accept the Terms and Conditions to continue.",
            });
            return;
        }

        try {
            // createUser ফাংশন কল
            const res = await createUser(email, password);
            const user = res.user;

            // Display Name এবং Photo URL আপডেট
            await updateProfile(user, {
                displayName: name,
                photoURL: url,
            });

            // ইউজার ডেটা ডাটাবেসে সংরক্ষণ
            const form = {
                name: user.displayName,
                email: email, // এখানে 'emaile' টাইপো ঠিক করেছি
                image: user.photoURL,
                role: role,
            };

            const response = await axiosPublic.post("/users", form);
            if (response.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Your account has been created successfully.",
                });
                navigate('/')
            } else {
                throw new Error("Failed to save user to database.");
            }
        } catch (err) {
            console.error("Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: `${err.message}`,
            });
        }
    };

    return (
        <div className="font-[sans-serif] bg-white max-w-7xl mx-auto mt-20 lg:mt-10 w-11/12">
            <div className="grid md:grid-cols-2 gap-8 ">
                <div className="max-md:order-1 p-4">
                    <img
                        src={registerImage}
                        className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto"
                        alt="login-image"
                    />
                </div>

                <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
                    <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                        <div className="text-center mb-12">
                            <h1 className="font-bold text-3xl">MedlinePlus</h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                        placeholder="Enter name"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        Email Id
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        Image Url
                                    </label>
                                    <input
                                        name="url"
                                        type="url"
                                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                        placeholder="Enter Image Url"
                                    />
                                </div>
                                <label className="text-gray-800 text-sm block">
                                    Select Your Role
                                </label>
                                <div className="relative z-20">
                                    <select
                                        name="role"
                                        className="relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary"
                                    >
                                        <option value="User">User</option>
                                        <option value="Seller">Seller</option>
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="text-gray-800 ml-3 text-sm"
                                    >
                                        I accept the{" "}
                                        <a
                                            href="#"
                                            className="text-blue-600 font-semibold hover:underline"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                            </div>

                            <div className="!mt-8">
                                <button
                                    type="submit"
                                    className={`w-full py-3 px-4 text-sm font-semibold rounded-md text-white ${
                                        isChecked
                                            ? "bg-blue-600 hover:bg-blue-700"
                                            : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                    disabled={!isChecked}
                                >
                                    Create an account
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm mt-6 text-center">
                                Already have an account?{" "}
                                <Link
                                    to={"/login"}
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                            <div className="mt-4">
                                <Google title={"Register"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
