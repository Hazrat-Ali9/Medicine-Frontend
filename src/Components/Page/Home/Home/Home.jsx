import React from 'react';
import Carousel from '../Carousel/Carousel';
import Categories from './Categories/Categories';
import { Helmet } from 'react-helmet-async';
import Category_Products from './Category_Products/Category_Products';
import Sponsors from './Sponsors/Sponsors';
import Attention from '../Attention/Attention';

const Home = () => {
    return (
        <div className='overflow-hidden'>
            <Helmet>
                <title> MedlinePlus/Home Page</title>
            </Helmet>
            <div className=''>
                <Carousel></Carousel>
                <Categories></Categories>
                <Category_Products></Category_Products>
                <Sponsors></Sponsors>
            </div>
        </div>
    );
};

export default Home;