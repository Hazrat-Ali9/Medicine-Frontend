import React from 'react';
import useCategoryProducst from '../../../../../hooks/useCategoryProducst';
import Category_products_items from './Category_products_items';
import dicountImage from '../../../../../assets/dis-1.avif'
import Attention from '../../Attention/Attention';
import { useParams } from 'react-router-dom';

const Category_Products = () => {
    const [categoriProducts] = useCategoryProducst();

    // বিভিন্ন ক্যাটাগরি অনুযায়ী প্রোডাক্ট ফিল্টার
    const OTCMedicine = categoriProducts.filter(item => item.category === "OTC Medicine");
    const Devices = categoriProducts.filter(item => item.category === "Devices");
    const PersonalCare = categoriProducts.filter(item => item.category === "Personal Care");
    const WomensCare = categoriProducts.filter(item => item.category === "WomenChoice");
    const DiabeticCare = categoriProducts.filter(item => item.category === "Diabetic Care");
    const BabyCare = categoriProducts.filter(item => item.category === "Baby Care");
    const DentalCare = categoriProducts.filter(item => item.category === "Dental Care");
    const Diapers = categoriProducts.filter(item => item.category === "Diapers");
    const discount_percentage = categoriProducts.filter(item => item.category === "Discount");

    return (
        <div className="max-w-7xl mx-auto mt-16 px-4 md:px-12">
            {/* OTC Medicine Section */}
            <div className="mb-16">
                <h1 className="font-extrabold text-3xl text-gray-800 mb-8 lg:mx-20 border-l-4 border-blue-500 pl-4">
                    OTC Medicine
                </h1>
                <Category_products_items items={OTCMedicine}></Category_products_items>
            </div>

            {/* Personal Care Section */}
            <div className="mb-16">
                <h1 className="font-extrabold text-3xl text-gray-800 mb-8 lg:mx-20 border-l-4 border-purple-500 pl-4">
                    Personal Care
                </h1>
                <Category_products_items items={PersonalCare}></Category_products_items>
            </div>
            <div className="mb-16">
                <div className="relative md:w-11/12 mx-auto">
                    {/* ব্যাকগ্রাউন্ড ইমেজ */}
                    <img
                        src={dicountImage}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                        alt="Discount Banner"
                    />
                    {/* ইমেজের উপর টেক্সট */}
                    <div className="absolute inset-0 flex items-center justify-end pr-10 bg-black bg-opacity-50 rounded-lg">
                        <div className="text-right text-white space-y-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold">
                                Big Discount Available!
                            </h1>
                            <p className="text-lg md:text-xl">
                                Grab your favorite products at an amazing price.
                            </p>
                            <button className="bg-teal-300 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>

                <h1 className="font-extrabold text-3xl text-gray-800 mt-10 mb-8 lg:mx-20 border-l-4 border-purple-500 pl-4">
                    Discount Percentage
                </h1>
                <Category_products_items items={discount_percentage}></Category_products_items>
            </div>


            {/* Women's Care Section */}
            <div className="mb-16">
                <h1 className="font-extrabold text-3xl text-gray-800 mb-8 lg:mx-20 border-l-4 border-pink-500 pl-4">
                    Women's Care
                </h1>
                <Category_products_items items={WomensCare}></Category_products_items>
            </div>
            
            <Attention></Attention>

            {/* Diabetic Care Section */}
            <div className="mb-16">
                <h1 className="font-extrabold text-3xl text-gray-800 mb-8 mt-16 lg:mx-20 border-l-4 border-yellow-500 pl-4">
                    Diabetic Care
                </h1>
                <Category_products_items items={DiabeticCare}></Category_products_items>
            </div>
        </div>
    );
};

export default Category_Products;
