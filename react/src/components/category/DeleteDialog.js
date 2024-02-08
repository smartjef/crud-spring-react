import React, { useState } from 'react';
import { deleteCategory } from '../../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';

const CategoryDelete = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [confirmation, setConfirmation] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteCategory(categoryId);
            console.log('Category deleted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
        
    };

    return (
        <div>
            <h2>Delete Category - {categoryId}</h2>
            {confirmation ? (
                <div>
                    <p>Are you sure you want to delete this category?</p>
                    <button className='btn btn-danger me-2' onClick={handleDelete}>Yes, Delete</button>
                    <button className='btn btn-primary me-2' onClick={() => setConfirmation(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>Click the button below to initiate the deletion.</p>
                    <button className='btn btn-warning me-2' onClick={() => setConfirmation(true)}>Initiate Deletion</button>
                    <Link to={`/`} className='btn btn-primary me-2'>Back to home</Link>
                </div>
            )}
        </div>
    );
};

export default CategoryDelete;
