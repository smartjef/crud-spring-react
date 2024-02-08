import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addNewProduct, getAllCategories, updateProduct } from '../../services/api';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

const ProductForm = ({ showModal, handleClose, initialProductData, onSubmitted }) => {
    const [productData, setProductData] = useState({
        name: initialProductData?.name??'',
        category: initialProductData?.category??'',
        price: initialProductData?.price??'',
        description: initialProductData?.description??'',
        imageUrl: initialProductData?.imageUrl??'',
    });

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        if(initialProductData){
            setProductData({
                name: initialProductData?.name??'',
                category: initialProductData?.category??'',
                price: initialProductData?.price??'',
                description: initialProductData?.description??'',
                imageUrl: initialProductData?.imageUrl??'',
            })
        }

    }
    , [initialProductData])

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

        if (initialProductData) {
            setProductData(initialProductData);
        }
    }, [initialProductData]);

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleCategoryChange = (category) => {
        setProductData({ ...productData, category });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (initialProductData) {
                await updateProduct(initialProductData.id, productData);
            } else {
                await addNewProduct(productData);
            }

            handleClose();
        } catch (error) {
            console.error('Error creating/updating product:', error);
        } finally {
            if(typeof onSubmitted === "function") onSubmitted()
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{initialProductData ? 'Edit Product' : 'Add New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className='mt-3'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formCategory" className='mt-3'>
                        <Form.Label>Category</Form.Label>
                        <select
                            className="form-select"
                            value={productData.category ? productData.category.id : ''}
                            onChange={(e) => handleCategoryChange(categories.find(category => category.id.toString() === e.target.value))}
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </Form.Group>

                    <Form.Group controlId="formPrice" className='mt-3'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className='mt-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter product description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImageUrl" className='mt-3'>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            name="imageUrl"
                            value={productData.imageUrl}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button type="submit" className='mt-3'>{initialProductData ? 'Update Product' : 'Add Product'}</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductForm;
