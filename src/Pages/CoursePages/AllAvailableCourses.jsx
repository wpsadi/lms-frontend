// import { isLoggedIn } from "@/helpers/checkLoggedIn";
import DefaultLayout from "@/Layouts/DefaultLay";
import { getAllCourses } from "@/Redux/slices/courseSlice";
import  { useEffect, useState } from "react";

// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AllAvailableCourses = () => {





  // const courseData = useSelector((state) => state.course.courses);

  const dispatch = useDispatch();
  const [once, setOnce] = useState(false);
  
  const navigate = useNavigate();

  const userInfo  = useSelector(state=>state.user)
  if (!userInfo.isLoggedIn){
    navigate("/userError",{
      state:{
        next:"/courses"
      }
    })
  }

  useEffect(() => {

    if (once === false) {
      getAllCourses();
      setOnce(true);
    }
  }, [dispatch, once,navigate]);



  


  

  return (
    <>
    
      <DefaultLayout>
        <Link to="/courses">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            Courses
          </h3>
        </Link>
      {
       (()=>{
        // const raiseLogModal = dispatch(isLoggedIn())
        // console.log(raiseLogModal)
        
        return "hi"
       })()
      }

      </DefaultLayout>
    </>
  );
};

export default AllAvailableCourses;
