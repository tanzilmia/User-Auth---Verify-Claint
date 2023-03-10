import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Verify from "../Pages/verifyUser/Verify";

const router = createBrowserRouter([
    {
        path: '/', element : <MainLayout/>,
        children : [
            {
                path: '/', element : <Home/>
            },
            {
                path: '/login', element : <Login/>
            },
            {
                path: '/register', element : <Register/>
            },
            {
                path: '/verify', element : <Verify/>
            },
        ]
    }
])

export default router