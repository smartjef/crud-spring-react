import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../services/api';
import ProductList from '../components/product/List';
import AddCategory from '../components/category/CreateForm';

const CategoryDetailView = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const handleCloseAddCategoryModal = () => setShowAddCategoryModal(false);
    const handleOPenAddCategoryModal = () => setShowAddCategoryModal(true);
    const [refresh, setRefresh] =useState(false)
    const toggleREfresh = ()=>setRefresh(!refresh)


    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await getCategoryById(categoryId);
                setCategory(response);
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchCategoryDetails();
    }, [categoryId, refresh]);

    return (
        <div className='bg-white p-5'>
            <div>
                <Link to="/" className='btn btn-primary mb-3'>Back to Categories</Link>
            </div>
            <h2>Category Detail</h2>
            {category ? (
                <div className='row'>
                    <div className='col-12 col-lg-4'>
                        {category.imageUrl ? (
                            <img src={category.imageUrl} alt={category.name} className='img-fluid' />
                        ) : (
                            <img src='https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/category/16/0933721/1.jpg' alt='Default' className='card-img-top' />
                        )}
                    </div>
                    <div className='col-12'>
                        <h3 className='fw-bold'>{category.name}</h3>
                        <div>
                            <button onClick={handleOPenAddCategoryModal} className='btn btn-primary me-2'>Edit</button>
                            <Link to={`/categories/${category.id}/delete`} className='btn btn-danger me-2'>Delete</Link>
                        </div>
                        <div className='row'>
                            <ProductList />
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <AddCategory show={showAddCategoryModal} handleClose={handleCloseAddCategoryModal} category={category} onSubmitted={toggleREfresh}/>

        </div>
    );
};

export default CategoryDetailView;
