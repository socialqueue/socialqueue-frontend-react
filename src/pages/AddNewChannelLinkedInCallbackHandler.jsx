import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddNewChannelLinkedIn = () => {
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState("");



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



    useEffect(() => {
        const saveAccessToken = async () => {
            try {
                const linkedinAuthorizationCode = window.location.href.split("?")[1].split("=")[1]

                const linkedinRedirectUri = window.location.origin + process.env.REACT_APP_LINKEDIN_REDIRECT_URI_PATH

                const requestBody = {
                    userId: userData.user.userId,
                    authorization_code: linkedinAuthorizationCode,
                    redirect_uri: linkedinRedirectUri
                };
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/channels/new/linkedin/request-access-token`,
                    requestBody
                );

                const userInfo = response.userInfo
                setMessage(userInfo.name)

                const resp = await axios.get(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/channels/get-user-info?userId=1&platform=linkedin`,
                );
                console.log(resp.data)
            }
            catch (error) {
                // console.log(error.response.data)
                setMessage(error.response?.data?.message)
            }
        }

        saveAccessToken()
    }, [userData])

    return (
        <>
            <main className='AddNewChannelLinkedIn'>
                AddNewChannelLinkedIn
                <div className="message">
                    {message}
                </div>
            </main>
        </>
    )
}

export default AddNewChannelLinkedIn



/*




*/