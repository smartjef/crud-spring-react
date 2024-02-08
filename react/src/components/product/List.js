import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProductForm from './AddModel';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [refresh, setRefresh] =useState(false)
    const toggleREfresh = ()=>setRefresh(!refresh)

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (productId) => {
        const productToEdit = products.find((product) => product.id === productId);
        setSelectedProduct(productToEdit);
        handleShow();
    };
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [refresh]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className='p-3'>
            <h1 className='h3'>Products</h1>
            <div className='row'>
                {products.map((product) => (
                    <div className='col-sm-12 col-md-6 col-lg-4 p-2' key={product.id}>
                        <div className='card card-body border-0'>
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className='card-img-top' />
                            ) : (
                                <img src='https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/0933721/1.jpg' alt='Default' className='card-img-top' />
                            )}
                            <h5 className='card-title' >{product.name}</h5>
                            <b>Ksh. {product.price}</b>
                            <p>{product.description}</p>
                            <div>
                                <Link to={`/products/${product.id}`} className='me-2 btn btn-success btn-sm'>View Detail</Link>
                                <button onClick={() => handleEdit(product.id)} className='me-2 btn btn-primary btn-sm'>Edit</button>
                                <button onClick={() => handleDelete(product.id)} className='me-2 btn btn-danger btn-sm'>Delete</button>
                            </div>  
                        </div>
                    </div>
                ))}
                <div className='col-sm-12 col-md-6 col-lg-4 p-2'>
                    <Button className='nav-link' onClick={handleShow}>
                        <div className='card card-body border-0 p-5 text-center'>
                            <h2 className='card-title'>Add Product</h2>
                            <p>Product</p>
                        </div>
                    </Button>
                    <ProductForm showModal={showModal} handleClose={handleClose}  initialProductData={selectedProduct} onSubmitted={toggleREfresh}/>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
