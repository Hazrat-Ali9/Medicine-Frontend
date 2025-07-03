import React, { useState } from 'react';
import useCarts from '../../../../hooks/useCarts';
import { FaDeleteLeft } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxios from '../../../../hooks/useAxios';
import { Link } from 'react-router-dom';

const Carts = () => {
    const [cart, refetch] = useCarts();
    const axiossecure = useAxios()
    const [loading, setLoading] = useState(false); // For loading state
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

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
                axiossecure.delete(`/carts/${id}`)
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
            <div className="bg-gray-50 md:flex md:flex-col items-center py-6">
                <div className="bg-white shadow-xl rounded-xl px-8 py-6 w-full max-w-5xl md:flex md:justify-between justify-start text-left items-center gap-6">
                    {/* Cart Items Count */}
                    <div className="text-center flex items-center gap-4">
                        <h2 className="text-xl text-gray-600">Total Items: </h2>
                        <p className="text-3xl font-bold text-blue-600">{cart.length}</p>
                    </div>

                    {/* Total Price */}
                    <div className="flex items-center gap-4 text-center">
                        <h2 className="text-xl text-gray-600">Total Price: </h2>
                        <p className="text-3xl font-bold text-green-600">${totalPrice.toFixed(2)}</p>
                    </div>

                    {/* Pay Button */}
                    <div className="flex justify-center w-full md:w-auto">
                        {
                            cart.length ? <Link to={'/dashboard/payments'}><button className="bg-blue-600 text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto">
                                Pay Now
                            </button></Link> :<button disabled className="bg-gray-500 text-white py-3 px-8 rounded-lg text-xl font-semibold  transition-all duration-300 w-full sm:w-auto">
                                Pay Now
                            </button>
                        }
                    </div>
                </div>
            </div>

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
                            {cart.map(product => (
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

export default Carts;
