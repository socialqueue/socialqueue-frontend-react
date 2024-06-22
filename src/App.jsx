import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import SetNewPassword from './pages/SetNewPassword.jsx';
import AddNewChannel from './pages/AddNewChannel.jsx';
import AddNewChannelLinkedInCallbackHandler from './pages/AddNewChannelLinkedInCallbackHandler.jsx';
import CreateNewPost from './pages/CreateNewPost.jsx';

// import { useSelector } from 'react-redux';


const App = () => {
    const [userData, setUserData] = useState(null);

    // console.log("userData", userData)

    useEffect(() => {
        const localUserData = localStorage.getItem("userData");
        // console.log("error")

        // console.log("localUserData", localUserData)
        try {
            const data = JSON.parse(localUserData)
            setUserData(data);
            // console.log(data)
        }
        catch (error) {
            console.log(error)
        }
        // console.log("data", data)
        // console.log("data", data)

        // setTimeout(() => {
        //     console.log("userDataTime", userData)
        // }, 2000);
    }, []);

    // const user = useSelector((state) => state.user.currentUser);


    const user = userData?.user
    // user ?
    // console.log("user", user)
    //     : console.log("no user")


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />


                    <Route
                        path="/auth/login"
                        element={user ? <Navigate to="/" replace /> : <Login />}
                    />
                    <Route
                        path="/auth/register"
                        element={user ? <Navigate to="/" replace /> : <Register />}
                    />
                    <Route
                        exact
                        path="/auth/reset-password"
                        element={user ? <Navigate to="/" replace /> : <ResetPassword />}
                    />
                    <Route
                        path="/auth/reset-password/set-new/:token"
                        element={user ? <Navigate to="/" replace /> : <SetNewPassword />}
                    />


                    <Route
                        exact
                        path="/channels/new"
                        element={user ? <AddNewChannel /> : <Navigate to="/auth/login" replace />}
                    />
                    <Route
                        exact
                        path={process.env.REACT_APP_LINKEDIN_REDIRECT_URI_PATH}
                        // element={user ? <AddNewChannelLinkedInCallbackHandler /> : <Navigate to="/auth/login" replace />}
                        element={<AddNewChannelLinkedInCallbackHandler />}
                    />



                    <Route
                        exact
                        path="/posts/new"
                        // path={process.env.REACT_APP_LINKEDIN_REDIRECT_URI_PATH}
                        // element={user ? <AddNewChannelLinkedInCallbackHandler /> : <Navigate to="/auth/login" replace />}
                        element={<CreateNewPost />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

