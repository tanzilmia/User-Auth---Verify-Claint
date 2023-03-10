import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../sheardComponent/Footer';
import Navbar from '../sheardComponent/Navbar';

const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
        </>
    );
};

export default MainLayout;