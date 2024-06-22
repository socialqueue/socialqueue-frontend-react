import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async e => {
        e.preventDefault();
        const requestBody = {
            email: email,
            password: password
        };
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`,
            requestBody
        );
        localStorage.setItem('userData', JSON.stringify(response.data))
        console.log(response)
        window.location.reload();
    };


    return (
        <>
            <Navbar />
            <main className='Login'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            value={email}
                            placeholder="enter a email"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">password: </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="enter a password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <Link to='/auth/reset-password'>forgot password?</Link>
                    <Link to={"/auth/register"}>Register</Link>
                </form>
            </main>
        </>
    );


    // return (
    //     <div>Login</div>
    // )
}

export default Login