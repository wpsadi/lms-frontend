import { GetSpecificCourses } from "@/appwrite/db/course/getSpecificCourse";
import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoAlertFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import courseNA from "@/assets/img_na.jpeg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useSelector } from "react-redux";
import Stackedit from "stackedit-js";
// import { purifyIt } from "@/helpers/domPurify";
import { createHTMLBlob } from "../../helpers/createHTMLBob";

function IndividualCourse() {
  const stackedit = new Stackedit();
  const userInfo = useSelector((state) => state.user);

  const category = () => {
    return (
      <>
        {data.category.map((cat, index) => (
          <div key={index}>
            <a
              href="#"
              className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2"
            >
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
              </svg>
              {cat}
            </a>
          </div>
        ))}
      </>
    );
  };
  const { courseID } = useParams();

  const [once, setOnce] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      const desc = document.getElementById("desc");
      stackedit.openFile(
        {
          name: "Filename",
          content: { text: data.desc },
        },
        true /* silent mode */
      );

      stackedit.on("fileChange", (file) => {
        // desc.setAttribute("referrerPolicy", "same-origin");
        desc.setAttribute(
          "src",
          createHTMLBlob(
            file.content.html,
            `
        body{
          font-family: 'Inter', sans-serif;
          
          height:fit-content;
        }
        `
          )
        );
      });
    }
  });

  useEffect(() => {
    if (once) {
      (async () => {
        toast.promise(
          (async () => {
            const push = await GetSpecificCourses(courseID);
            setOnce(false);
            if (push.status === 200) {
              setData(push.resp);

              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          })(),
          {
            loading: "Loading...",
            success: "Course Loaded",
            error: "Failed to Load Course",
          }
        );
      })();
    }
  }, [courseID, once, data]);

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
                      to="/courses"
                      className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Courses
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
                      to={`/courses/${courseID}`}
                      className="ms-1 font-medium text-black md:ms-2 dark:text-gray-400"
                    >
                      {courseID}
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </h3>
        </nav>
        {once === true ? (
          <>
            <div
              className="flex  items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <AiOutlineLoading
                className="flex-shrink-0 inline w-4 h-4 me-3 animate-spin"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
              <div>
                <span className="font-medium">Please be patience</span> We are
                search the depths of the seas for the course you requested
              </div>
            </div>
          </>
        ) : (
          <>
            {data === null ? (
              <>
                <div
                  role="alert"
                  className="py-5 alert alert-error text-white transition duration-75 "
                >
                  <GoAlertFill />
                  <span>Course doesn&apos;t Exist !</span>
                </div>
              </>
            ) : (
              <>
                <div className="hero min-h-screen bg-base-200">
                  <div className="hero-content flex-col lg:flex-row-reverse ">
                    <div className="text-center lg:text-left">
                      <h1 className="text-5xl font-bold">{data.title}</h1>
                      <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>
                      <div className="flex justify-start gap-2 mt-2 flex-wrap">
                        {category()}
                      </div>
                      <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>
                      <div>
                        <a href={`#main-card`}>
                          <button className="btn mb-3 hover:bg-green-600 bg-green-600 text-white font-semibold fon-mono">
                            Move to Purchase Option
                          </button>
                        </a>
                      </div>
                      <div className="mockup-window border bg-base-300 ">
                        <div className="flex items-center flex-col px-4 py-2 bg-base-200">
                          <p className="invisible h-0 ">{data.desc}</p>
                        <iframe
                        id="desc"
                        className="py-2 w-full min-h-[20em] max-h-[500px]"
                      ></iframe>
                        </div>
                      </div>

                    </div>
                    <div
                      className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 "
                      id="main-card"
                    >
                      <div className="card-body">
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <a className="bg-transparent block p-2">
                            <img
                              className=" rounded-lg w-full "
                              src={data.thumbnail ?? courseNA}
                              alt="product image"
                            />
                          </a>
                          <div className="px-5 pb-5">
                            <a href="#">
                              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {data.title}
                              </h5>
                            </a>
                            <div className="flex items-center mt-2.5 mb-5">
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                              </div>
                              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                5.0
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {Number(data.price) === 0 ? (
                                  "Free"
                                ) : (
                                  <>
                                    {data.currency} {data.price}
                                  </>
                                )}
                              </span>
                              <a
                                href="#"
                                className="text-white btn btn-primary bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                Purchase <MdOutlineShoppingBag />
                              </a>
                            </div>
                          </div>
                          <div className="px-5 pb-3">
                            <span className="font-bold font-mono">
                              Course by:{" "}
                              <span className="underline italics font-normal">
                                {data.createdBy}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="form-control mt-6">
                          {userInfo.isLoggedIn === false && (
                            <>
                              <Link to="/signin" className="btn btn-primary">
                                SignIn
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </DefaultLayout>
    </>
  );
}

export default IndividualCourse;
