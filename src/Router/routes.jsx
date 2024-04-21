import AboutUs from "@/Pages/About";
import ContactUs from "@/Pages/Contact";
import ErrorPage from "@/Pages/Error404";
import Home from "@/Pages/Home";
import LogoutUser from "@/Pages/Logout";
import SignIn from "@/Pages/SignIn";
import SignUp from "@/Pages/SignUp";
import UserProfile from "@/Pages/UserProfile";
import VerifyEmail from "@/Pages/verifiEmail";
import { Routes,Route } from "react-router-dom";

function CustomRoutes(){
    return (<>
    <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/user" element={<UserProfile/>} />
        <Route path="/logout" element={<LogoutUser/>} />
        <Route path="/verify" element={<VerifyEmail/>} />





        {/* Universal Route */}
        <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>)
}

export default CustomRoutes;