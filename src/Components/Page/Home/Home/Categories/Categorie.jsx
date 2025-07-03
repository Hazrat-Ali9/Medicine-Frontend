import React from 'react';
import { Link } from 'react-router-dom';

const Categorie = ({item}) => {
    const {categoryImage,category} = item;
    return (
        <Link to={`/shop`}>
            <div className=' border-2 border-slate-200 max-h-60 rounded-md p-5'>
                <img className='mx-auto w-10' src={categoryImage} alt="" />
                <h1 className='font-bold text-xl text-center'>{category}</h1>
            </div>
        </Link>
    );
};

export default Categorie;