import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react"; // Modal এর জন্য Headless UI ব্যবহার করছি।
import Category_item from "../../Home/Home/Category_Products/Category_item";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [selectedProduct, setSelectedProduct] = useState(null); // Modal এর প্রোডাক্ট ডেটার জন্য।
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal ওপেন কন্ট্রোল।

    const [cart, setCart] = useState([]); // Cart ডেটার জন্য।
    const [currentPage, setCurrentPage] = useState(1); // Pagination।
    const [productsPerPage] = useState(10);

    // ডাটা লোড করা
    useEffect(() => {
        fetch("https://medicine-server-ten.vercel.app/products")
            .then((res) => res.json())
            .then((data) => setAllProducts(data))
            .catch((error) => console.error("Error fetching product data:", error));

        fetch("https://medicine-server-ten.vercel.app/category")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching category data:", error));
    }, []);

    // ফিল্টারড প্রোডাক্টস
    const filteredProducts =
        selectedCategory === "All"
            ? allProducts
            : allProducts.filter(
                (product) => product.category === selectedCategory
            );

    // Pagination Calculation
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Cart এ প্রোডাক্ট অ্যাড করা
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 flex gap-6 mt-16 flex-col md:flex-row">
            {/* Categories Section */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <h1 className="text-xl font-bold mb-4">Categories</h1>
                <div className="space-y-4">
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <button
                                key={category.id}
                                className={`w-full text-left px-4 py-2 flex items-center justify-start rounded ${selectedCategory === category.category
                                    ? "bg-teal-400 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                onClick={() => {
                                    setSelectedCategory(category.category);
                                    setCurrentPage(1); // ক্যাটেগরি পরিবর্তন হলে পেজ রিসেট
                                }}
                            >
                                <img
                                    src={category.categoryImage}
                                    className="w-10 mr-2"
                                    alt=""
                                />
                                <h1 className="font-bold">{category.category}</h1>
                            </button>
                        ))}
                </div>
            </div>

            {/* Products Section */}
            <div className="w-full md:w-3/4">
                {/* Products Table */}
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Category</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={product.image} alt={product.name} className="w-12" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product.name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product.category}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ${product.price}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    <button
                                        className="bg-teal-500 text-white px-3 py-1 rounded"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Eye
                                    </button>
                                    <button
                                        className="bg-teal-400 text-white px-3 py-1 rounded"
                                        onClick={() => addToCart(product)}
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-6 flex justify-center items-center gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded ${currentPage === index + 1
                                ? "bg-teal-500 text-white"
                                : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedProduct && (
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-xl text-gray-500"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times; {/* This is the close icon */}
                        </button>

                        {/* Modal Content */}
                        <Category_item Category_item_product={selectedProduct} />
                    </div>
                </Dialog>
            )}

        </div>
    );
};

export default AllProducts;
