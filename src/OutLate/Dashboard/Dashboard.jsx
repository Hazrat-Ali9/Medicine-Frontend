import { useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { FaBars, FaHome, FaUser, FaSignOutAlt, FaAddressCard, FaBook, FaUserAlt, FaSellsy } from "react-icons/fa";
import { FaCartShopping, FaHouseMedical, FaProductHunt, FaSellcast } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import { MdPayment, MdPayments } from "react-icons/md";
import { CgProductHunt } from "react-icons/cg";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const [isSeller] = useSeller(); // useSeller হুক ব্যবহার করুন

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed md:relative bg-gradient-to-b from-teal-700 to-teal-500 h-screen md:w-64 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"}`}>
                <nav className="flex flex-col px-4 py-6 h-full gap-6 rounded-2xl">
                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-white">MedlinePlus</h1>

                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        {isAdmin ? (
                            <><h1 className="font-bold text-left text-white text-2xl">Admin Dashboard</h1>
                                <NavLink to="/dashboard/adminHome" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <RiAdminFill className="h-6 w-6 mr-2" />
                                    Admin Home
                                </NavLink>
                                <NavLink to="/dashboard/allusers" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaUserAlt className="h-6 w-6 mr-2" />
                                    All Users
                                </NavLink>
                                <NavLink to="/dashboard/allProducts" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaProductHunt className="h-6 w-6 mr-2" />
                                    All Products
                                </NavLink>
                                <NavLink to="/dashboard/sellerInformation" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaSellcast className="h-6 w-6 mr-2" />
                                    Seller Information
                                </NavLink>
                            </>
                        ) : isSeller ? (
                            <>
                            <h1 className="font-bold text-left text-white text-2xl">Seller Dashboard</h1>
                                <NavLink to="/dashboard/sellerHome" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaSellsy className="h-6 w-6 mr-2" />
                                    Seller Home
                                </NavLink>
                                <NavLink to="/dashboard/carts" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <CgProductHunt className="h-6 w-6 mr-2" />
                                    My Orders Products
                                </NavLink>
                                <NavLink to="/dashboard/manageMedicines" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaCartShopping className="h-6 w-6 mr-2" />
                                    Manage Medicines
                                </NavLink>
                                <NavLink to="/dashboard/addProduct" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaAddressCard className="h-6 w-6 mr-2" />
                                    Add Product
                                </NavLink>
                                {/* <NavLink to="/dashboard/orders" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaBook className="h-6 w-6 mr-2" />
                                    Orders
                                </NavLink> */}
                                <NavLink to="/dashboard/sellerPaymentsHistory" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <MdPayment className="h-6 w-6 mr-2" />
                                    Payment
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/dashboard/userHome" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaHouseMedical className="h-6 w-6 mr-2" />
                                    User Home
                                </NavLink>
                                <NavLink to="/dashboard/carts" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <FaCartShopping className="h-6 w-6 mr-2" />
                                    Carts
                                </NavLink>
                                <NavLink to="/dashboard/paymentsHistory" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <MdPayments className="h-6 w-6 mr-2" />
                                    Payment history
                                </NavLink>
                                <NavLink to="/shop" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                                    <BiFoodMenu className="h-6 w-6 mr-2" />
                                    Shops
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Profile and Logout */}
                    <div className="mt-auto">
                        <NavLink to="/" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                            <FaHome className="h-6 w-6 mr-2" />
                            Home
                        </NavLink>
                        <NavLink to="/" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                            <FaUser className="h-6 w-6 mr-2" />
                            Profile
                        </NavLink>
                        <NavLink to="/" className={({ isActive }) => isActive ? "bg-gray-400 text-white flex items-center px-4 py-2 rounded-2xl" : "text-gray-100 flex items-center px-4 py-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"}>
                            <FaSignOutAlt className="h-6 w-6 mr-2" />
                            Logout
                        </NavLink>
                    </div>
                </nav>
            </div>

            {/* Hamburger Icon (only mobile) */}
            <div className="absolute left-4 top-4 md:hidden">
                <FaBars className="h-6 w-6 text-gray-800 cursor-pointer" onClick={toggleSidebar} />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 overflow-y-auto">
                <div className="px-8 py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
