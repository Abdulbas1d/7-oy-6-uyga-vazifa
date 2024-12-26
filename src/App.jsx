import React, { createContext, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Details from './pages/Details';
import Cart from './pages/Cart';

export const CountCart = createContext(null);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CountCart.Provider value={{ count, setCount }}>
        <Routes>
          <Route index element={<MainLayout><Home /></MainLayout>} />
          <Route path='/about' element={<MainLayout><About /></MainLayout>} />
          <Route path='/products' element={<MainLayout><Products /></MainLayout>} />
          <Route path='/products/:id' element={<MainLayout><Details /></MainLayout>} />
          <Route path='/cart' element={<MainLayout><Cart /></MainLayout>} />
        </Routes>
      </CountCart.Provider>
    </div>
  );
}

export default App;
