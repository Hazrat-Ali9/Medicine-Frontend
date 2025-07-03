import React from 'react';
import { useForm } from "react-hook-form";
import useSecurePublic from '../../../../hooks/useSecurePublic';
import useAxios from '../../../../hooks/useAxios';
import Swal from 'sweetalert2';
import useAuthContext from '../../../hooks/useAuthContext';

const AddProducts = () => {
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = useSecurePublic();
    const axiosSecure = useAxios();
    const { register, handleSubmit, reset } = useForm();
    const {user} = useAuthContext();
    console.log(user)

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                const shopItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    image: res.data.data.display_url,
                    des: data.des,
                    email : user.email
                };
                const productRes = await axiosSecure.post('/products', shopItem);

                if (productRes.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    reset();
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error("Error uploading product:", error);
        }
    };

    return (
        <div className="w-full mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-xl border border-gray-300">
            <h1 className="font-extrabold text-3xl text-center text-blue-700 mb-6">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800">Product Name</label>
                    <input {...register("name", { required: true })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter product name" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800">Description</label>
                    <textarea {...register("des", { required: true })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter product description"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Price</label>
                        <input type="number" {...register("price", { required: true })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter price" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Category</label>
                        <select {...register("category", { required: true })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
                            <option value="OTC Medicine">OTC Medicine</option>
                            <option value="Devices">Devices</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="WomenChoice">WomenChoice</option>
                            <option value="Diabetic Care">Diabetic Care</option>
                            <option value="Baby Care">Baby Care</option>
                            <option value="Dental Care">Dental Care</option>
                            <option value="Diapers">Diapers</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Email</label>
                        <input type="email" defaultValue={user.email} disabled {...register("email", { required: true })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter price" />
                    </div>

                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800">Upload Image</label>
                    <input type="file" {...register("image", { required: true })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">Add Product</button>
            </form>
        </div>
    );
};

export default AddProducts;
