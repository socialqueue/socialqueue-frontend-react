import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const localUserData = localStorage.getItem("userData");
        try {
            const data = JSON.parse(localUserData)
            setUserData(data);
        }
        catch (error) {
            console.log(error)
        }
    }, []);

    // console.log(userData)

    const handleLogout = () => {
        setUserData({});
        localStorage.clear();
        window.location.reload();
    };

    return (
        <nav className='Navbar'>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/auth/login"}>Login</Link></li>
                <li><Link to={"/auth/register"}>Register</Link></li>
                <li><Link to={"/channels/new"}>AddNewChannel</Link></li>
                <li><Link to={"/posts/new"}>CreateNewPost</Link></li>
            </ul>

            {userData?.user
                ?
                <li>
                    {userData?.user?.firstName} is loggged in
                    <button onClick={handleLogout}>logout</button>
                </li>
                :
                <li>
                    not logged in
                    <Link to={"/auth/login"}>Login</Link>
                </li>
            }
        </nav>
    )
}

export default Navbar