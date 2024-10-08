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
import AdminAuthCheck from "@/helpers/requireAdminAuth";
import CreateCourse from "@/Pages/CoursePages/CreateCourse";
import EditCourse from "@/Pages/CoursePages/editCourse";
import DeleteCourse from "@/Pages/CoursePages/deleteCourse";
import UpdatePassword from "@/Pages/AuthPages/updatePassword";
import UpdateProfile from "@/Pages/AuthPages/updateUserProfile";
import ForgotPassword from "@/Pages/AuthPages/forgot-password";
import ResetPassword from "@/Pages/AuthPages/Reset-password";
import LecturePage from "@/Pages/Lectures/lecturePage";
import UserPaymentCheck from "@/helpers/requirePayment";
import CreateLecture from "@/Pages/Lectures/createLecture";
import DeleteLecture from "@/Pages/Lectures/deleteLecture";
import EditLecture from "@/Pages/Lectures/editLecture";
// import AdminAuthCheck from "@/helpers/requireAdminAuth";
// import CreateCourse from "@/Pages/CoursePages/CreateCourse";

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
        <Route path="/user/update-password" element={<UpdatePassword/>} />
        <Route path="/user/update-profile" element={<UpdateProfile/>} />
        <Route path="/user/forgot-password" element={<ForgotPassword/>}/>
        <Route path={"/user/reset"} element = {<ResetPassword/>}/>


        {/* Courses Routes */}
                <Route element={<AdminAuthCheck/>} >
            <Route path="/courses-create" element={<CreateCourse/>} />
            <Route path="/courses/:courseID/edit" element={<EditCourse/>} />
            <Route path="/courses/:courseID/delete" element={<DeleteCourse/>} />
        </Route>
        <Route path="/courses" element={<AllAvailableCourses/>} />
        <Route path="/courses/:courseID" element={<IndividualCourse />} />


        {/* Lecture */}
        <Route element={<UserPaymentCheck/>} >
            <Route path="/learn/:courseID" element={<LecturePage/>} />
            <Route path="/learn/:courseID/new" element={<CreateLecture/>} />
            <Route path="/learn/:courseID/:LectureID/edit" element={<EditLecture/>} />
            <Route path="/learn/:courseID/:LectureID/delete" element={<DeleteLecture/>} />
        </Route>



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