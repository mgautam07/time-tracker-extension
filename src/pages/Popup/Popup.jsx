import React from 'react';
import './Popup.css';
import { Routes, Route } from 'react-router-dom';
import About from './about';
import Home from './Home';

const Popup = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Popup;
