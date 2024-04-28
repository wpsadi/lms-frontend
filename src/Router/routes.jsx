import AboutUs from "@/Pages/About";
import ContactUs from "@/Pages/ContactUsPages/Contact";
import ErrorPage from "@/Pages/Error404";
import Home from "@/Pages/Home";
import LogoutUser from "@/Pages/AuthPages/Logout";
import SignIn from "@/Pages/AuthPages/SignIn";
import SignUp from "@/Pages/AuthPages/SignUp";
import UserProfile from "@/Pages/AuthPages/UserProfile";
import VerifyEmail from "@/Pages/AuthPages/verifiEmail";
import { Routes,Route } from "react-router-dom";
import AllAvailableCourses from "@/Pages/CoursePages/AllAvailableCourses";
import UserRelatedError from "@/Pages/UserRelatedError";
import IndividualCourse from "@/Pages/CoursePages/IndividualCourse";
import UserAuthCheck from "@/helpers/requireUserAuth";
import AllQueries from "@/Pages/ContactUsPages/AllQueries";
import IndividualQuery from "@/Pages/ContactUsPages/IndividualQuery";

function CustomRoutes(){
    return (<>
    <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/about" element={<AboutUs/>} />

        {/* User Routes */}
        <Route path="/userError" element={<UserRelatedError/>} />

        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/user" element={<UserProfile/>} />
        <Route path="/logout" element={<LogoutUser/>} />
        <Route path="/verify" element={<VerifyEmail/>} />


        {/* Courses Routes */}
        <Route path="/courses" element={<AllAvailableCourses/>} />
        <Route path="/courses/:courseID" element={<IndividualCourse />} />

        {/* Queries Routes */}
        <Route element={<UserAuthCheck/>} >
            <Route path="/queries" element={<AllQueries/>} />
            <Route path="/queries/:queryID" element={<IndividualQuery/>} />
            {/* <Route path="/queries/:queryID" element={<IndividualQuery/>} /> */}
        </Route>





        {/* Universal Route */}
        <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>)
}

export default CustomRoutes;