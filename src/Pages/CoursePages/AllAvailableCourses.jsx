// import { isLoggedIn } from "@/helpers/checkLoggedIn";
import DefaultLayout from "@/Layouts/DefaultLay";
import { getAllCourses } from "@/Redux/slices/courseSlice";
import { fetchUser } from "@/Redux/slices/userSlice";
import React, { useEffect, useState } from "react";


// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import CourseCard from "@/comp/courseCard";

const AllAvailableCourses = () => {
  const courseData = useSelector((state) => state.course.courses);

  const [checkUser, setCheckedUser] = useState(false);

  const dispatch = useDispatch();

  const [once,SetOnce] = useState(false)

  // const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo.isLoggedIn) {
      if (!checkUser) {
        dispatch(fetchUser(false));
        setCheckedUser(true);
      }
      // navigate("/userError", {
      //   state: {
      //     next: "/courses",
      //   },
      // });
      // return;
    }

    if (once === false ) {
      dispatch(getAllCourses());
      SetOnce(true)
    }

    
  }, [dispatch, userInfo, checkUser,once]);

  return (
    <>
      <DefaultLayout>
        <Link to="/courses">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            Courses
          </h3>
        </Link>

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
        <div>
          {courseData && courseData.total > 0 && (
            <div className="py-5 px-4 mx-auto max-w-screen-xl lg:py-8 flex  gap-8 lg:gap-8 ">
              <div className="flex flex-row  h-fit gap-2 ">
                {courseData.documents.map((course, index) => (
                  <React.Fragment key={index}>
                    <CourseCard course={course}/>
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
