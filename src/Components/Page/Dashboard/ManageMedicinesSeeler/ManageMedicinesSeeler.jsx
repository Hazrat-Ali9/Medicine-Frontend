import React, { useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import { FaDeleteLeft } from 'react-icons/fa6';
import useAuthContext from '../../../hooks/useAuthContext';
import useProduct from '../../../../hooks/useProduct';
import Swal from 'sweetalert2';

const ManageMedicinesSeeler = () => {
    const [products, refetch] = useProduct();
    console.log(products)
    const axiossecure = useAxios()
    const [loading, setLoading] = useState(false); // For loading state
    const {user} = useAuthContext();
    const filterCart = products.filter(product => product.email === user.email)

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true); // Start loading state
                axiossecure.delete(`/products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            // Filter out deleted item from cart
                            // setCart(cart.filter(item => item._id !== id));
                            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                        }
                        refetch()
                    })
                    .catch(err => {
                        Swal.fire('Error!', 'Something went wrong, try again!', 'error');
                    })
                    .finally(() => setLoading(false)); // End loading state
            } else {
                console.log('Delete canceled');
            }
        });
    };

    return (
        <>
            

            {/* Product Table */}
            <div className="bg-gray-50 py-12 px-6">
                <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
                    <table className="min-w-full text-left table-auto">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-2 text-sm sm:text-xl font-bold">Image</th>
                                <th className="px-4 py-2 text-sm sm:text-xl font-bold">Price</th>
                                <th className="px-4 py-2 text-sm sm:text-xl font-bold">Name</th>
                                <th className="px-4 py-2 text-sm sm:text-xl font-bold">Discount</th>
                                <th className="px-4 py-2 text-sm sm:text-xl font-bold">Category</th>
                                <th className="px-4 py-2 text-sm sm:text-xl font-bold">Email</th>
                                <th className="px-4 py-2 text-sm sm:text-xl font-bold">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCart.map(product => (
                                <tr key={product._id} className="border-b">
                                    <td className="px-4 py-2">
                                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="px-4 py-2 text-sm sm:text-lg text-gray-800">${product.price}</td>
                                    <td className="px-4 py-2 text-sm sm:text-lg text-gray-800">{product.name}</td>
                                    <td className="px-4 py-2 text-sm sm:text-lg text-gray-800">
                                        {product.discount ? `${product.discount}% discount` : 'No discount'}
                                    </td>
                                    <td className="px-4 py-2 text-sm sm:text-lg text-gray-800">{product.category}</td>
                                    <td className="px-4 py-2 text-sm sm:text-lg text-gray-800">{product.email}</td>
                                    <td className="px-4 py-2 text-sm sm:text-lg text-gray-800">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex items-center gap-2 bg-red-500 text-white px-2 rounded-lg py-1"
                                            disabled={loading}
                                        >
                                            {loading ? 'Deleting...' : <><FaDeleteLeft /> Delete</>}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default ManageMedicinesSeeler;