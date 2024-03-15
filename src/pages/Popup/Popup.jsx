import React from 'react';
import './Popup.css';
import { Routes, Route } from 'react-router-dom';
import Week from './Week';
import Home from './Home';
import Timers from './Timers'
import Navbar from './components/Navbar'
import '../../styles'

const Popup = () => {
  return (
    <div className='text-center text-sm dark:text-neutral-100 dark:bg-neutral-900 min-h-[600px]'>
      <div className='p-2 pb-1 text-base font-medium'>Web Time Tracker</div>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/week" element={<Week />} />
        <Route path="/webtimers" element={<Timers />} />
      </Routes>
    </div>
  );
};

export default Popup;
