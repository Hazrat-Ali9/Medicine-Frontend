import React, { useEffect, useState } from 'react';

const useCategoryProducst = () => {
    const [categoriProducts, setCategoriProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://medicine-server-ten.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setCategoriProducts(data);
                setLoading(false)
            })
    }, []);
    return [categoriProducts, loading]
};

export default useCategoryProducst;