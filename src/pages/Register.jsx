import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setfirstName] = useState("");


    const handleSubmit = async e => {
        e.preventDefault();
        const requestBody = {
            email: email,
            password: password,
            firstName: firstName
        };
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/register`,
            requestBody
        );
        console.log(response.data)
        localStorage.setItem('userData', JSON.stringify(response.data))
        window.location.reload();
    };


    return (
        <>
            <Navbar />
            <main>
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
                    <div>
                        <label htmlFor="firstName">firstName: </label>
                        <input
                            type="text"
                            value={firstName}
                            placeholder="enter a firstName"
                            onChange={({ target }) => setfirstName(target.value)}
                        />
                    </div>
                    <button type="submit">Register</button>
                    <Link to={"/auth/register"}>Register</Link>
                </form>
            </main>
        </>
    );


    //   return (
    //     <div>Register</div>
    //   )
}

export default Register