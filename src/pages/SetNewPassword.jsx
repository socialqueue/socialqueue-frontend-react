import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SetNewPassword = () => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const token = window.location.pathname.split("/")[4]
    // console.log(token)

    useEffect(() => {
        const verifyResetPasswordToken = async () => {
            try {
                const requestBody = {}
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/reset-password/verify-token/${token}`,
                    requestBody
                );

                console.log(response.data)
                setMessage(response.data.message)
            }
            catch (error) {
                console.log(error.response.data)
                setMessage(error.response.data.message)
            }
        }

        verifyResetPasswordToken()
    }, [])


    const handleSubmit = async e => {
        e.preventDefault();
        const requestUrl = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/reset-password/set-new/${token}`
        const requestBody = {
            password: password
        };
        const response = await axios.post(
            requestUrl,
            requestBody
        );
        console.log(response.data)
    };


    return (
        <main className='SetNewPassword'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">New Password: </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="enter a password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Set Password</button>
            </form>
            <div className="message">
                {message}
            </div>
        </main>
    )
}

export default SetNewPassword