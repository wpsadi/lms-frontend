import DefaultLayout from "@/Layouts/DefaultLay";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
// import { CreateNewCourse } from "@/appwrite/db/course/CreateCourses";
import { GetSpecificCourses } from "@/appwrite/db/course/getSpecificCourse";
import { getSpecificLecture } from "@/appwrite/db/lectures/getSpecificLecture";
import { EditLecturesApp } from "@/appwrite/db/lectures/editLecture";

function EditLecture() {
  window.TAGIFY_DEBUG = false;
  const [isActive,setIsActive] = useState(false)
  const [loadingMessage,setLoadingMessage] = useState("making things ready for you...");
  const [once, setOnce] = useState(true);
  const [loading, setLoading] = useState(false);



    const navigate = useNavigate();

  const desc= "Here it begins..."

  const {courseID,LectureID} = useParams();

  const [courseData, setCourseData] = useState({});


  const [resetRequested,setResetRequested] = useState(false)
  
  const [lectureData,setLectureData] = useState({})

  useEffect(() => {


    if (once) {
        setOnce(false);
        setLoading(true);
      (async () => {
        // console.log("hi")
        
        setLoadingMessage("Creating safe environment for you to edit the course")
        const courseInfo = await GetSpecificCourses(courseID);
        const lectureInfo = await getSpecificLecture(LectureID)
        if ((courseInfo.status === 200) && (lectureInfo.status=== 200)) {
          setCourseData(courseInfo.resp);
          setLectureData(lectureInfo.resp)
        }
        else{
            toast.error("Error Fetching Lecture");
            navigate("/courses");
            
        }
        setLoadingMessage("making things ready for you...")

        setLoading(false);
        
      })();
    }
  },[once, courseID, navigate, courseData.thumbnail, resetRequested,LectureID]);

  return (
    <>
      <DefaultLayout>
        <nav className="mb-2 ">
          <h3 className="font-mono font-bold italic underline dark:text-white">
          <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse flex-wrap">
                <li>
                  <div className="flex items-center">
                    {/* <svg className="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
</svg> */}
                    <Link
                      to={`/learn/${courseID}`}
                      className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Lectures
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-black mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to={`/learn/${courseID}/${LectureID}/edit`}
                      className="ms-1 font-medium text-black md:ms-2 dark:text-gray-400"
                    >
                    Edit
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </h3>
        </nav>
        {loading === true && (
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

        <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Edit Lecture
              </h2>
              <form
              id="courseForm"
                onSubmit={async (evt) => {
                  evt.preventDefault();

         
                  const formData = new FormData(evt.target); // Access the form's elements

                  // Convert formData to a plain object
                  const formDataObject = {};
                  formData.forEach((value, key) => {
                    formDataObject[key] = value;
                  });




                  if (isActive){
                    return
                  }
                  setIsActive(true);
                  setLoading(true);
                  setLoadingMessage("Updating Lecture...");
                  (async ()=>{
                    

                    const push = await EditLecturesApp(LectureID,{...formDataObject});
                    
                    setIsActive(false);
                    setLoading(false);
                    setLoadingMessage("making things ready for you...")
                    
                    if (push.status=== 200){
                        toast.success("Lecture Updated Successfully");
                        setResetRequested(true)
                        navigate(`/learn/${courseID}`)
                        evt.target.reset()
                    }
                    else{
                        setResetRequested(true)
                        toast.error(push.resp);
                    }



                  })()



                }}
              >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 placeholder:italic"
                      placeholder="Name here"
                      defaultValue={(!resetRequested && lectureData.title) || ""}
                      required
                    />
                  </div>
                  

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="desc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="desc-content"
                      rows="8"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="About Course Here"
                      required
                      name="desc"

                      defaultValue={(!resetRequested && lectureData.desc) || desc}   
                    ></textarea>
                    
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex bg-blue-500  items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Save Changes
                </button>
              </form>
            </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export default EditLecture;
