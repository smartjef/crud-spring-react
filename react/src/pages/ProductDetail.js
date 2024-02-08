import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Link } from 'react-router-dom';

const ProductDetailView = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await getProductById(productId);
                setProduct(response);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);    

    return (
        <div className='bg-white p-5'>
            <div>
                <Link to="/" className='btn btn-primary mb-3'>Back to Products</Link>
            </div>
            <h2>Product Detail</h2>
            {product ? (
            <div className='row'>
                <div className='col-sm-6'>
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className='card-img-top' />
                ) : (
                    <img src='https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/0933721/1.jpg' alt='Default' className='card-img-top' />
                )}
                </div>
                <div className='col-sm-6'>
                    <h3 className='fw-bold'>{product.name}</h3>
                    <p>Category: {product.category.name}</p>
                    <p>Price: <b className='text-primary'>KSh. {product.price}</b></p>
                    <p>
                        Description: <br/>
                        {product.description}
                    </p>
                </div>
            </div>
                ) : (
                    <div>Loading...</div>
                )}
        </div>
    );
};

export default ProductDetailView;
