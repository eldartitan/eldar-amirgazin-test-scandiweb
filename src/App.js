import { Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './component/cartPage';
import Category from './component/CategoryPage';
import Layout from './component/Layout';
import Product from './component/productPage';


function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Category />} />
          <Route path=':category' element={<Category />} />
          <Route path=':category/:id' element={<Product />} />
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
