import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useCarts from "../../hooks/useCarts";

const DetailseProduct = () => {
    const product = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxios();
    const [, refetch] = useCarts()
    console.log(product); // Check if data is coming properly

    if (!product) {
        return (
            <div className="text-center text-red-500">
                <p>Product not found or loading failed!</p>
            </div>
        );
    }

    const { name, price, des, category, _id, image, discounted_price, discount_percentage } = product;
    const { user } = useAuthContext()

    const handleAddToCart = (item) => {
        if (user && user.email) {
            const itemInformation = {
                menuId : _id,
                email : user.email,
                name,
                image, 
                price,
                category,
                discount : discount_percentage,
            }
            axiosSecure.post(`/carts`, itemInformation).then(res =>  {
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: 'Success!',
                        text: `${name} has been successfully added to the cart.`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    refetch()
                }
            })
        } else {
            // Show alert if the user is not logged in
            Swal.fire({
                title: 'You are not logged in!',
                text: 'Please log in to add items to the cart.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Log In',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to login page if user clicks "Log In"
                    navigate('/login', {state: {from:location}});
                }
            });
        }
    };


    return (
        <div className=" dark:bg-gray-800 py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 relative">
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src={image}
                                alt={name}
                            />
                            {discount_percentage > 0 && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {discount_percentage}% OFF
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            {name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                            Category: <span className="font-semibold">{category}</span>
                        </p>
                        <div className="text-gray-800 dark:text-gray-300 text-xl font-bold mb-4">
                            {discounted_price ? (
                                <>
                                    <span className="line-through text-red-600 mr-2">${price}</span>
                                    <span className="text-green-600">${discounted_price}</span>
                                </>
                            ) : (
                                <span className="text-green-600">${price}</span>
                            )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                            {des}
                        </p>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button onClick={() => handleAddToCart(product)} className="w-full flex justify-center gap-2 text-teal-400 bg-gray-900 dark:bg-gray-600  py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                    <FaShoppingCart className="text-2xl text-teal-400" /> Add to Cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailseProduct;
