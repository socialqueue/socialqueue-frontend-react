import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios';

const CreateNewPost = () => {
    const [scheduledPosts, setScheduledPosts] = useState([]);
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
        const getAllPosts = async () => {
            try {
                console.log("userData", userData)

                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/posts`,
                    { params: { userId: userData.user.userId } }
                );

                console.log("response.data", response.data)

                setScheduledPosts(response.data)
            }
            catch (error) {
                console.log(error)
            }

        }

        getAllPosts()
    }, [userData])

    const linkedinBaseUrl = "https://www.linkedin.com/oauth/v2/authorization"
    const linkedinParams = {
        response_type: "code",
        client_id: "776gpdeprmul5x",
        // redirect_uri: "https://oauth.pstmn.io/v1/callback",
        scope: "openid profile email w_member_social r_learningdata"
    }

    const queryO = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=776gpdeprmul5x&redirect_uri=https://oauth.pstmn.io/v1/callback&scope=openid profile email w_member_social r_learningdata"
    // console.log(queryO)


    const query = `${linkedinBaseUrl}?response_type=${linkedinParams.response_type}&client_id=${linkedinParams.client_id}&redirect_uri=${linkedinParams.redirect_uri}&scope=${linkedinParams.scope}`
    // console.log(query)


    // console.log(queryO === query)


    return (
        <>
            <Navbar />
            <main className='CreateNewPost'>
                {/*
                <ol>
                    <li>
                        <Link to={query} >
                            LinkedIn
                        </Link>
                    </li>
                </ol>
                */}

                {/* text share */}
                <form>
                    {/*
{
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": "Hello World! This is my first Share on LinkedIn!"
            },
            "shareMediaCategory": "NONE"
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
}
                */}
                </form>


                Scheduled Posts: {scheduledPosts.length}
                <table>
                    <th>
                        <td>id</td>
                        <td>scheduledTime</td>
                        <td>status</td>
                    </th>
                    {scheduledPosts.map(post => (
                        <tr>
                            <td>id</td>
                            <td>scheduledTime</td>
                            <td>status</td>
                        </tr>
                    ))}
                </table>
            </main>
        </>
    )
}

export default CreateNewPost