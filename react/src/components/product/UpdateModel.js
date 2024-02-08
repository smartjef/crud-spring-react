import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateProduct, getProductById } from '../../services/api';
import ProductForm from './ProductForm';

const UpdateProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleUpdate = async (updatedProductData) => {
        try {
            await updateProduct(productId, updatedProductData);
            window.location.reload();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
            {product && <ProductForm initialData={product} onSubmit={handleUpdate} />}
        </div>
    );
};

export default UpdateProduct;
