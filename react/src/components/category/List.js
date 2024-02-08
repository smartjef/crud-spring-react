import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Link } from 'react-router-dom';
import AddCategory from './CreateForm';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [refresh, setRefresh] =useState(false)
    const toggleREfresh = ()=>setRefresh(!refresh)
    const handleCloseAddCategoryModal = () => setShowAddCategoryModal(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                setError('Error fetching categories: '+error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [refresh]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div>
            <h3 className='text-primary'>Filter by category</h3>
            <hr/>
            <div className='d-flex py-3 justify-content-between'>
                <div>
                    <Link href='/' className='btn btn-sm btn-primary me-2 px-5 rounded-pill'>All</Link>
                    {categories.map((category) => (
                        <Link to={`/categories/${category.id}`} className='btn btn-sm btn-outline-primary me-2 rounded-pill' key={category.id}><div className='d-flex align-items-center'>
                            {category.imageUrl ? (
                                <img src={category.imageUrl} alt={category.name} width={30} />
                            ) : (
                                <img src='https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/0933721/1.jpg' alt='Defaul' width={30} />
                            )}
                            {category.name}</div>
                        </Link>
                    ))}
                </div>
                <AddCategory show={showAddCategoryModal} handleClose={handleCloseAddCategoryModal} onSubmitted={toggleREfresh}/>
                <button onClick={()=>setShowAddCategoryModal(true)} className='btn btn-primary rounded-pill me-2'>Add Category</button>
            </div>
        </div>
    );
};

export default CategoryList;
