import React, { useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import Swal from 'sweetalert2';
import { FaDeleteLeft } from 'react-icons/fa6';
import useAllProducts from '../../../../hooks/useAllProducts';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllProductsAdmin = () => {
    const [products, refetch] = useAllProducts();
    const axiossecure = useAxios();
    const [deletingProductId, setDeletingProductId] = useState(null); // লোকাল লোডিং
    // পেজিনেশন
    const [currentPage, setCurrentPage] = useState(1);
    const itemPage = 10;
    const indexOfLastItem = currentPage * itemPage;
    const indexOfFirstItem = indexOfLastItem - itemPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPage = Math.ceil(products.length / itemPage);

    // প্রোডাক্ট ডিলিট ফাংশন
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
                setDeletingProductId(id);
                axiossecure.delete(`/products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                        }
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire('Error!', 'Something went wrong, try again!', 'error');
                    })
                    .finally(() => setDeletingProductId(null));
            }
        });
    };

    return (
        <div className="bg-gray-50 py-12 px-6">
            <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
                <table className="min-w-full text-left table-auto">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Discount</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(product => (
                            <tr key={product._id} className="border-b">
                                <td className="px-4 py-2">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2">${product.price}</td>
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">{product.discount ? `${product.discount}% discount` : 'No discount'}</td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2">{product.email ?product.email : <span className='font-bold text-teal-600'>Admin</span> }</td>
                                <td className="px-4 py-2 flex items-center gap-2">
                                    <Link to={`/dashboard/updateItem/${product._id}`}
                                        className="flex items-center gap-2 bg-teal-400 text-white px-2 rounded-lg py-1"
                                        disabled={deletingProductId === product._id}
                                    >
                                        {deletingProductId === product._id ? 'Deleting...' : <><FaEdit /> Edit</>}
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="flex items-center gap-2 bg-red-500 text-white px-2 rounded-lg py-1"
                                        disabled={deletingProductId === product._id}
                                    >
                                        {deletingProductId === product._id ? 'Deleting...' : <><FaDeleteLeft /> Delete</>}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPage }, (_, i) => (
                    <button
                        key={i}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllProductsAdmin;
