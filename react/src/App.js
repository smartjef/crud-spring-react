import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home';
import ProductDetailView from './pages/ProductDetail';
import CategoryDetailView from './pages/CategoryDetail';
import CategoryList from './components/category/List';
import CategoryDelete from './components/category/DeleteDialog';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route exact path="/products/:productId" element={<ProductDetailView />} />
          <Route path="/categories" element={<CategoryList/>} />
          <Route exact path="/categories/:categoryId" element={<CategoryDetailView />} />
          <Route path="/categories/:categoryId/delete" element={<CategoryDelete />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;