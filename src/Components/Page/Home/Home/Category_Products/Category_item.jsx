import React from 'react';
import { Link } from 'react-router-dom';

const Category_item = ({ Category_item_product }) => {
    const { name, image, price, _id, des, discount_percentage, discounted_price } = Category_item_product;

    // Description ছোট করা
    const shortDescription = des.length > 40 ? `${des.slice(0, 40)}...` : des;
    const nameshort = name.length > 15 ? `${name.slice(0, 15)}...` : name;

    return (
        <div className="">
            <div className="bg-gradient-to-r from-gray-100 via-white to-gray-50 rounded-xl overflow-hidden shadow-md ring-2 ring-gray-300 hover:ring-blue-400 transition duration-300 ease-in-out w-full h-full flex flex-col min-h-[400px]">
                {/* Image Section */}
                <div className="relative group h-60">
                    <img
                        className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 transform group-hover:scale-105"
                        src={image}
                        alt="Product Image"
                    />
                    {/* শুধুমাত্র তখন দেখাবে যখন discount_percentage থাকবে */}
                    {discount_percentage && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                            {discount_percentage}% Discount
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {nameshort}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                        {shortDescription}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        {discount_percentage ? (
                            <span className="font-bold text-xl text-gray-800">
                                <sup className="text-lg"> ${discounted_price}</sup> <del>${price}</del>
                            </span>
                        ) : (
                            <span className="font-bold text-xl text-gray-800">
                                ${price}
                            </span>
                        )}
                        <Link to={`/products/${_id}`} className="bg-teal-300 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out text-sm">
                            View Product
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category_item;
