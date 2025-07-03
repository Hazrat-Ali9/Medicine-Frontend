import React from 'react';
import { Helmet } from 'react-helmet-async';
import coverImage from '../../../../assets/dis-1.avif';
import AllProducts from '../AllProducts/AllProducts';

const Shop = () => {
    return (
        <div className="overflow-hidden">
            <Helmet>
                <title>MedlinePlus / Shop Page</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <section className="relative rounded-md">
                    {/* Image */}
                    <img
                        src={coverImage}
                        className="md:w-full mx-auto md:h-80 object-cover"
                        alt="Shop Cover"
                    />
                    
                    {/* Overlay with h1 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <h1 className="text-white text-4xl font-bold text-center">
                        👇 All Products 👇
                        </h1>
                    </div>
                </section>
                <AllProducts></AllProducts>
            </div>
        </div>
    );
};

export default Shop;
