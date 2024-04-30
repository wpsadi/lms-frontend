// import { isLoggedIn } from "@/helpers/checkLoggedIn";
import DefaultLayout from "@/Layouts/DefaultLay";
import { getAllCourses } from "@/Redux/slices/courseSlice";
import { fetchUser } from "@/Redux/slices/userSlice";
import React, { useEffect, useState } from "react";

// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "@/comp/courseCard";
import { AiOutlineLoading } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";

const AllAvailableCourses = () => {
  const [showCreate, setShowCreate] = useState(false);

  const loadingMessage = "trying... to load the content for you";
  const [loadingAllQueries, setLoadingAllQueries] = useState(false);

  const courseData = useSelector((state) => state.course.courses);

  const [shouldIcheckUser, setShouldIcheckUser] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [once, SetOnce] = useState(false);

  // const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user);

  
  useEffect(() => {
    setShowCreate(false)
    if (once === false) {
      (async () => {
        setLoadingAllQueries(true);
        await dispatch(getAllCourses());

        
        setLoadingAllQueries(false);
      })();

      



        SetOnce(true);


    }

    
    if (shouldIcheckUser === true){
      (async ()=>{
      setShouldIcheckUser(false)
      await dispatch(fetchUser(false))
      })()
    }

    if (userInfo.isLoggedIn && userInfo.all.labels.includes("admin")) {
      setShowCreate(true)
    }


  }, [dispatch, userInfo, once, shouldIcheckUser]);



  return (
    <>
      <DefaultLayout>
        <Link to="/courses">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            Courses
          </h3>
        </Link>
        {loadingAllQueries === true && (
          <>
            <div
              className="flex items-center p-4 mb-4 mt-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <AiOutlineLoading
                className="flex-shrink-0 inline w-4 h-4 me-3 animate-spin"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
              <div>
                <span className="font-medium">Please be patience</span>{" "}
                {loadingMessage}
              </div>
            </div>
          </>
        )}

        <div
          id="sticky-banner"
          tabIndex="-1"
          className="relative mb-2 rounded-full shadow-md top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <div className="flex items-center mx-auto">
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <span className="sr-only">Light bulb</span>
              </span>
              <span>
                {!courseData.total > 0 ? (
                  <>There are no courses available at the moment</>
                ) : (
                  <>We have got enticing courses for you</>
                )}
              </span>
            </p>
          </div>
          {courseData.total > 0 && (
            <>
              <div className="flex items-center">
                <button
                  data-dismiss-target="#sticky-banner"
                  type="button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    document.getElementById("sticky-banner").remove();
                  }}
                  className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close banner</span>
                </button>
              </div>
            </>
          )}
        </div>

        {showCreate && (
          <>
            <div
              className="flex items-center flex-row justify-between p-4 mt-2 text-md text-green-600 rounded-lg  bg-blue-50 dark:bg-gray-800 dark:text-green-200"
              role="alert"
            >
              <div className="flex items-center">
                <MdAdminPanelSettings
                  className="flex-shrink-0 inline me-3 text-3xl "
                  aria-hidden="true"
                />
                {/* <span className="sr-only">Hi ADMIN!</span> */}
                <div>
                  <span className="font-medium">
                    Hi <u>ADMIN</u> ! Do you want to create new Course?
                  </span>
                </div>
              </div>
              <button onClick={()=>{
                navigate("/courses-create")
              }} className="btn bg-green-600 text-white hover:bg-green-800  active:bg-green-400">
                Create Course
              </button>
            </div>
          </>
        )}

        <div>
          {courseData && courseData.total > 0 && (
            <div className="py-5 px-4 mx-auto max-w-screen-xl lg:py-4 flex  gap-8 lg:gap-4 ">
              <div className="flex flex-row flex-wrap justify-center h-fit gap-2 ">
                {courseData.documents.map((course, index) => (
                  <React.Fragment key={index}>
                    <CourseCard course={course} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default AllAvailableCourses;
