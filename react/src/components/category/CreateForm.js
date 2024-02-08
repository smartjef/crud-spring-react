import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addNewCategory, updateCategory } from '../../services/api';

function AddCategoryModal({ show, handleClose, category, onSubmitted }) {
    const [categoryData, setCategoryData] = useState({
        name: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (category) {
            setCategoryData({
                name: category.name ?? '',
                imageUrl: category.imageUrl ?? '',
            })
        }
    }, [category])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(category){

                await updateCategory(category.id, categoryData)
            }else {
                await addNewCategory(categoryData);
            }
            handleClose();
        } catch (error) {
            console.error('Error creating category:', error);
        } finally {
            if(typeof onSubmitted === "function") onSubmitted()
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{category ? 'Edit Category' : 'Add New Category'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                name="name"
                                value={categoryData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Enter image URL"
                                name="imageUrl"
                                value={categoryData.imageUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" className='mt-3' type="submit">
                            {category ? 'Edit Category' : 'Add New Category'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default AddCategoryModal;
