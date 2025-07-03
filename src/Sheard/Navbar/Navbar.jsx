import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useContext, useState } from 'react';
import logo from '../../assets/logo.jpg'
import { AuthContext } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';
import useCarts from '../../hooks/useCarts';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for managing dropdown visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for managing mobile menu visibility
    const { user, logOut } = useContext(AuthContext);
    
    const [isAdmin] = useAdmin()
    const [isSeller] = useSeller()

    const [cart] = useCarts()

    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Toggle the mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to log out from your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire(
                            'Logged Out!',
                            'You have been successfully logged out.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire(
                            'Error!',
                            'Something went wrong during log out.',
                            'error'
                        );
                    });
            }
        });
    };

    const items = <>
        <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
            <Link to="/">Home</Link>
        </li>
        <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
            <Link to="/shop">Shop</Link>
        </li>
        <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
            <Link to="#">languages</Link>
        </li>
        
        {
            user && isAdmin && <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
            <Link to="/dashboard/adminHome">Dashboard</Link>
        </li>
        }
        {
            user && isSeller && <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
            <Link to="/dashboard/sellerHome">Dashboard</Link>
        </li>
        }
        {
            user && !isAdmin && !isSeller && <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
            <Link to="/dashboard/userHome">Dashboard</Link>
        </li>
        }
    </>

    return (
        <div className="py-1 lg:py-2 w-full  bg-transparent lg:relative z-50 dark:bg-gray-900">
            <nav className="z-10 sticky top-0 left-0 right-0 max-w-7xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Company Name */}
                    <button>
                        <div className="flex items-center space-x-2">
                            <img
                                src={logo} // Replace with your logo image URL
                                alt="Logo"
                                className="w-20 lg:w-24 h-10 lg:h-12 rounded-sm"
                            />
                            <h2 className="text-black dark:text-white font-bold text-2xl">MedlinePlus</h2>
                        </div>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
                            {items}
                        </ul>
                    </div>

                    {/* Cart, Login, and Profile for Desktop */}
                    <div className="hidden lg:flex lg:items-center gap-x-2">
                        <div className="flex items-center justify-center">
                            <Link to="/dashboard/carts" className="text-black dark:text-white text-xl flex">
                                <FaShoppingCart /> <sup>{cart.length}</sup>
                            </Link>
                        </div>
                        {
                            user ? <Link onClick={handleLogout}
                                className="flex items-center justify-center rounded-md bg-teal-200 text-black px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
                            >
                                Logout
                            </Link> : <Link
                                to="/login"
                                className="flex items-center justify-center rounded-md bg-teal-200 text-black px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
                            >
                                Login
                            </Link>
                        }
                        {/* Profile Image and Dropdown */}
                        <div className="relative">
                            <button onClick={toggleDropdown}>
                                <img
                                    src={user?.photoURL || "https://via.placeholder.com/150"} // Replace with a default image URL
                                    alt="Profile"
                                    className="w-14 h-14 rounded-full cursor-pointer"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md z-50">
                                    <ul>
                                        <li>
                                            <Link
                                                className="block px-4 font-bold"
                                            >
                                                Hi, {user?.displayName || "Guest"}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Hamburger Icon for Mobile */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="focus:outline-none text-slate-200 dark:text-white">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                className="text-2xl text-slate-800 dark:text-white focus:outline-none active:scale-110 active:text-red-500"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4 flex flex-col gap-y-4">
                        <ul className="space-y-4 text-base font-bold text-black/60 dark:text-white">
                            {items}
                        </ul>

                        {/* Cart, Login, and Profile for Mobile */}
                        <div className="flex items-center justify-between mt-4">
                            <Link to="/cart" className="text-black flex dark:text-white text-xl">
                                <FaShoppingCart /><sup>0</sup>
                            </Link>
                            {
                                user ? <Link onClick={handleLogout}
                                    className="flex items-center justify-center rounded-md bg-teal-200 text-black px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
                                >
                                    Logout
                                </Link> : <Link
                                    to="/login"
                                    className="flex items-center justify-center rounded-md bg-teal-200 text-black px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
                                >
                                    Login
                                </Link>
                            }
                            {/* Profile Image for Mobile */}
                            <div className="relative">
                            <button onClick={toggleDropdown}>
                                <img
                                    src={user?.photoURL || "https://via.placeholder.com/150"} // Replace with a default image URL
                                    alt="Profile"
                                    className="w-14 h-14 rounded-full cursor-pointer"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md z-50">
                                    <ul>
                                        <li>
                                            <Link
                                                className="block px-4 font-bold"
                                            >
                                                Hi, {user?.displayName || "Guest"}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
