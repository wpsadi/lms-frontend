/* eslint-disable react/prop-types */
import courseNA from "@/assets/img_na.jpeg";
import { purifyIt } from "@/helpers/domPurify";
import { useSelector } from "react-redux";
import {  Link } from "react-router-dom";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function CourseCard({course}){
  const userInfo = useSelector((state) => state.user);
    const thumbnail = ()=>{
        return (<>
                                <img
                          className="rounded-lg w-full h-40 object-cover"
                          src={course.thumbnail || courseNA}
                          alt=""
                        />
        </>)
    }

    const category = ()=>{
        return (<>
        {course.category.map((cat, index) => (
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
        </>)
    }

    return (<>
    <Link to={`/courses/${course.$id}`}> 
    <div className="max-w-md w-72 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
            {thumbnail()}
                      </a>

                      <div className="p-5 flex flex-col gap-1">
                        <div className="dropdown dropdown-hover">
                          <div tabIndex={0} className=" m-1">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                              {course.title}
                            </h5>
                          </div>
                          <div
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                Title
                              </h3>
                            </div>
                            <div className="px-3 py-2">
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {course.title}
                              </p>
                            </div>
                            <div data-popper-arrow></div>
                          </div>
                        </div>
                        {
                          userInfo.isLoggedIn && userInfo.all.labels.includes("admin") && (<>
                          <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>
                                                  <div className="flex flex-row gap-2 flex-wrap justify-start">
                                                  <Link onClick={(e) => e.stopPropagation()} to={`/courses/${course.$id}/delete`}><button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"><RiDeleteBin2Fill /></button></Link>
                                                  
<Link onClick={(e) => e.stopPropagation()} to={`/courses/${course.$id}/edit`}><button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"><FaEdit /></button></Link>

                                                  </div>
                          </>)
                        }

                        <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>
                        <div className="dropdown dropdown-hover">
                          <div tabIndex={0} className=" m-1">
                            <div className="flex flex-start gap-2 line-clamp-1 ">
                            {category()}
                            </div>


                          </div>
                          <div
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                Category
                              </h3>
                            </div>
                            <div className="px-3 py-2">
                            <div className="flex gap-2">
                            {category()}
                            </div>
                            </div>
                            <div data-popper-arrow></div>
                          </div>
                        </div>


                        
                        <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>

                        <div className="dropdown dropdown-hover">
                          <div tabIndex={0} className=" m-1">
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3" dangerouslySetInnerHTML={{__html:purifyIt({htmlContent:course.desc})}}>
                              
                            </p>
                          </div>
                          <div
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                Description
                              </h3>
                            </div>
                            <div className="px-3 py-2">
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto max-h-48 min-w-32"  dangerouslySetInnerHTML={{__html:purifyIt({htmlContent:course.desc})}}>
                                
                              </p>
                            </div>
                            <div data-popper-arrow></div>
                          </div>
                        </div>
                        <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>

                        <div className="flex flex-row justify-between justify-self-end">
                        <a
                          href="#"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Check Out
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </a>
                        <a
                          className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-black dark:text-white rounded-lg "
                        >
                          {Number(course.price) === 0 ? "Free" : (<>{course.currency} {course.price}</>)}
                          

                        </a>
                        </div>

                      </div>
                    </div>
    </Link>



    </>)
}

export default CourseCard;