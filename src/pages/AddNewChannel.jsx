import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios';

const AddNewChannel = () => {
    const [connectedChannels, setConnectedChannels] = useState([]);
    const [userData, setUserData] = useState(null);


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
        const getAllChannels = async () => {
            try {
                console.log("userData", userData)

                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/channels`,
                    { params: { userId: userData.user.userId } }
                );

                console.log("response.data", response.data)

                setConnectedChannels(response.data)
            }
            catch (error) {
                console.log(error)
            }

        }

        getAllChannels()
    }, [userData])


    const linkedinBaseUrl = "https://www.linkedin.com/oauth/v2/authorization"
    const linkedinParams = {
        response_type: "code",
        client_id: "776gpdeprmul5x",
        redirect_uri: `${process.env.REACT_APP_BASE_URL}/channels/new/linkedin/callback`,
        // redirect_uri: "https://oauth.pstmn.io/v1/callback",
        scope: "openid profile email w_member_social r_learningdata"
    }


    const query = `${linkedinBaseUrl}?response_type=${linkedinParams.response_type}&client_id=${linkedinParams.client_id}&redirect_uri=${linkedinParams.redirect_uri}&scope=${linkedinParams.scope}`
    console.log(query)


    return (
        <>
            <Navbar />
            <main className='AddNewChannel'>
                <ol>
                    <li>
                        <Link to={query} >
                            LinkedIn
                        </Link>
                    </li>
                </ol>

                Connected Channels: {connectedChannels.length}
                <ol>
                    {connectedChannels.map(channel => (
                        <li key={channel.id}>
                            {channel.platform}
                        </li>
                    ))}
                </ol>
            </main>
        </>
    )
}

export default AddNewChannel