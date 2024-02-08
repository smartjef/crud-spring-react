import React from 'react';
import CategoryList from '../components/category/List';
import ProductList from '../components/product/List';
function Homepage() {
    return (
        <div className="container">
            <CategoryList />
            <ProductList />
        </div>
    );
}

export default Homepage;
