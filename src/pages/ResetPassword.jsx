import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState("");


    const handleSubmit = async e => {
        e.preventDefault();
        const requestUrl = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/reset-password/generate-token`
        const requestBody = {
            email: email
        };
        const response = await axios.post(
            requestUrl,
            requestBody
        );
        console.log(response.data)
    };


    return (
        <main className='ResetPassword'>
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
                <button type="submit">send reset link</button>
                {/* <Link to='/auth/reset-password'>forgot password?</Link> */}
            </form>
        </main >
    )
}

export default ResetPassword