import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className='Home'>
            <Navbar />

            <div className="main">
                Home
            </div>
        </div>
    )
}

export default Home