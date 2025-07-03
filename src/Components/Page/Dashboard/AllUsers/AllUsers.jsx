import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxios();
    const { data: user = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Function to update user role
    const handleRoleChange = (role, userId, userName) => {
        axiosSecure.patch(`/users/${userId}`, { role })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${userName} is now ${role}.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                Swal.fire('Error!', 'Failed to update role.', 'error');
                console.error(err);
            });
    };

    // Function to delete user
    const handleDelete = (userId) => {
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
                axiosSecure.delete(`/users/${userId}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'User has been deleted.', 'success');
                            refetch();
                        }
                    })
                    .catch((err) => {
                        Swal.fire('Error!', 'Failed to delete user.', 'error');
                        console.error(err);
                    });
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-700">All Users: {user.length}</h1>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-4 px-6 text-left text-gray-600 font-bold">Name</th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold">Email</th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold">Photo</th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold">Role</th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold">Actions</th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold">User Roloe</th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {user.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                                <td className="py-4 px-6 border-b border-gray-200">{user.name}</td>
                                <td className="py-4 px-6 border-b border-gray-200 truncate">{user.email}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <img className="w-16 h-16 object-cover rounded-full border-2 border-gray-300" src={user.image} alt={user.name} />
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200">{user.role}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <select
                                        className="py-1 px-3 rounded-full text-xs font-semibold focus:outline-none bg-gray-200"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(e.target.value, user._id, user.name)}
                                    >
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.role === "admin" && <span className="text-red-600 font-bold">Admin User</span>}
                                    {user.role === "seller" && <span className="text-green-600 font-bold">Seller User</span>}
                                    {user.role === "user" && <span className="text-blue-600 font-bold">Normal User</span>}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
