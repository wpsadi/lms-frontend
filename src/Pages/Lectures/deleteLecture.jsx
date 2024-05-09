import DefaultLayout from "@/Layouts/DefaultLay";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
// import { CreateNewCourse } from "@/appwrite/db/course/CreateCourses";
import { GetSpecificCourses } from "@/appwrite/db/course/getSpecificCourse";
import { getSpecificLecture } from "@/appwrite/db/lectures/getSpecificLecture";
import { DeleteLecturesApp } from "@/appwrite/db/lectures/deleteLecture";

function DeleteLecture() {
  const [isActive, setIsActive] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "making things ready for you..."
  );
  const [once, setOnce] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { courseID,LectureID } = useParams();

  const [courseData, setCourseData] = useState({});
  const [lectureData,setLectureData] = useState({})

  const [shouldIshow, setShouldIshow] = useState(false);

  useEffect(() => {
    if (once) {
      setOnce(false);
      setLoading(true);
      (async () => {
        // console.log("hi")

        setLoadingMessage(
          "Creating safe environment for you to edit the course"
        );
        const courseInfo = await GetSpecificCourses(courseID);
        const lectureInfo = await getSpecificLecture(LectureID)
        if ((courseInfo.status === 200) && (lectureInfo.status=== 200)) {
          setCourseData(courseInfo.resp);
          setLectureData(lectureInfo.resp)
          setShouldIshow(true)
        } else {
          toast.error("Error Fetching lectures");
          navigate(`/learn/${courseID}`);
        }
        setLoadingMessage("making things ready for you...");

        setLoading(false);
      })();
    }
  }, [once, courseID, navigate, courseData.thumbnail,LectureID]);

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
                      to={`/learn/${courseID}/${LectureID}/delete`}
                      className="ms-1 font-medium text-black md:ms-2 dark:text-gray-400"
                    >
                      Delete
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
          {shouldIshow && (
            <>
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 flex justify-center flex-row place-content-center">
                <form
                  id="deleteForm"
                  onSubmit={async (evt) => {
                    evt.preventDefault();

                    if (isActive) {
                      return;
                    }
                    setIsActive(true);
                    setLoading(true);
                    setLoadingMessage("Deleting Lecture...");
                    (async () => {
                      const push = await DeleteLecturesApp(lectureData.$id);

                      setIsActive(false);
                      setLoading(false);
                      setLoadingMessage("making thngs ready for you...");
                      if (push.status === 200) {
                        toast.success("Course Deleted Successfully");
                        navigate(`/learn/${courseID}`);
                        evt.target.reset();
                      } else {
                        toast.error(push.resp);
                      }
                    })();
                  }}
                  className=""
                >
                  <div
                    id="popup-modal"
                    tabIndex="-1"
                    className=" overflow-y-auto overflow-x-hidden   z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative p-4 w-full max-w-md max-h-full ">
                      <div className="relative bg-white rounded-lg  dark:bg-gray-700 shadow-2xl border-gray-400 border-[1px] border-solid">
                        <button
                          type="button"
                          className="invisible absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="popup-modal"
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
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                          <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Lecture <br />
                            {` ID : ${lectureData.$id} `}?
                          </h3>
                          <button
                            data-modal-hide="popup-modal"
                            type="submit"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                          >
                            Yes, &apos;m sure
                          </button>
                          <button
                            data-modal-hide="popup-modal"
                            onClick={() => {
                              navigate(`/learn/${courseID}`);
                            }}
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </section>
      </DefaultLayout>
    </>
  );
}

export default DeleteLecture;
