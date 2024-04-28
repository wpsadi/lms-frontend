import { GetSpecificQueriesApp } from "@/appwrite/db/Helpdesk/getSpecificQuery";
import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

function IndividualQuery() {
  const { queryID } = useParams();
  const loadingMessage = "trying to fetch records";
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const [loadingAllQueries, setLoadingAllQueries] = useState(false);

  useEffect(() => {
    if (isLoaded === false  ) {
        if (isActive === true){
            return;
        }
        toast.promise((()=>{
            setLoadingAllQueries(true);
            return (async () => {
              const pull = await GetSpecificQueriesApp(queryID);
              // //(pull)
              if (pull.status === 200) {
                // //(pull.resp)
                setActive(false)
                setData(pull.resp);
                setIsLoaded(true);
                setLoadingAllQueries(false);
                return Promise.resolve("Data fetched successfully")
              } else {
                setActive(false)
                setLoadingAllQueries(false);
                return Promise.reject("Failed to fetch data")
              }
            })();  
        })(),{
            loading: "Fetching data",
            success: (msg)=>msg,
            error:(e)=>e
        
        })

    }
  }, [isLoaded, queryID]);
  return (
    <>
      <DefaultLayout className="">
        <div>
          <nav className="pb-2 ">
            <h3 className="font-mono font-bold italic underline dark:text-white">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse  flex-wrap">
                  <li>
                    <div className="flex items-center">
                      {/* <svg className="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
  </svg> */}
                      <Link
                        to="/contact"
                        className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </li>
                  <li>
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
                        to="/queries"
                        className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        {"Queries"}
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
                        to={`/queries/${queryID}`}
                        className="ms-1 font-medium text-black md:ms-2 dark:text-gray-400"
                      >
                        {queryID}
                      </Link>
                    </div>
                  </li>
                </ol>
              </nav>
            </h3>
          </nav>

          <section className="">
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

            {isLoaded === true && (
              <div>
                {/* <!-- Modal toggle --> */}

                {/* <!-- Main modal --> */}
                <div
                  id="defaultModal"
                  tabIndex="-1"
                  aria-hidden="false"
                  className=" overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full "
                >
                  <div className="flex justify-center">
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto shadow-2xl shadow-current">
                      {/* <!-- Modal content --> */}
                      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between flex-wrap items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white break-words  text-pretty">
                            Query {`{ ID : ${queryID} }`}
                          </h3>
                          <h6 className={`text-md font-semibold rounded-full  px-3 py-2 border-[2px] border-solid  ${(() => {
                          if (data.status === "resolved") {
                            return "border-green-400 text-green-400";
                          } else if (data.status === "discarded") {
                            return "border-red-600 text-red-600";
                          } else if (data.status === "junk") {
                            return "border-yellow-400 text-yellow-400";
                          } else if (data.status === "pending") {
                            return "border-blue-400 text-blue-400";
                          }
                        })()}`}>
                            {(data.status).toUpperCase()}
                          </h6>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form action="#">
                          <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                                required=""
                                defaultValue={data.email}
                                disabled
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="time"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Time of query
                              </label>
                              <input
                                type="text"
                                name="time"
                                id="time"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                disabled
                                required=""
defaultValue={(()=>{
    const now = new Date(data.$createdAt).toLocaleString();
    console.log(now)
    return now;
})()}                                

                              />
                            </div>
                            <div>
                              <label
                                htmlFor="country"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Country
                              </label>
                              <input
                                type="text"
                                name="country"
                                id="country"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder=""
                                disabled
                                defaultValue={data.country}
                                required=""
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="responded"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Responded?
                              </label>
                                <input
                                    type="text"
                                    name="responded"
                                    id="responded"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${(()=>{
                                        if(data.responded === true){
                                            return "text-green-400 border-green-400"
                                        }else if(data.responded === false){
                                            return "text-red-600 border-red-600"
                                        }   
                                    })()}`}
                                    disabled
                                    defaultValue={String(data.responded).toUpperCase()}
                                    required=""
                                />
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="Query"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Query
                              </label>
                              <textarea
                                id="Query"
                                rows="4"
                                disabled
                                defaultValue={data.query}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write product description here"
                              ></textarea>
                            </div>
                            {data.responded === true && (
                                                            <div className="sm:col-span-2">
                                                            <label
                                                              htmlFor="response"
                                                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                              Response
                                                            </label>
                                                            <textarea
                                                              id="response"
                                                              rows="4"
                                                              disabled
                                                              defaultValue={data.response ?? "NULL"}
                                                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                              placeholder="Write product description here"
                                                            ></textarea>
                                                          </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                          <button
                            type="submit"
                            onClick={()=>{
                                navigate("/queries")
                            }}
                            className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            <IoCloseSharp className="mr-1 -ml-1 w-6 h-6 text-sm" />
                            Close
                          </button>
                          <button
                            type="btn"
                            onClick={()=>{
                                setIsLoaded(false)
                                isActive(true)
                            }}
                            className={`border-solid border-[2px] border-black font-mono text-sm inline-flex items-center   focus:ring-4 focus:outline-none  font-medium rounded-lg  px-5 py-2.5 text-center text-black bg-white ${(()=>{
                                if (isActive){
                                    return "animate-spin"
                                }
                                else{
                                    return ""
                                }
                            })()}`}
                          >
                            <TfiReload className="mr-1 -ml-1 w-6 h-6 text-sm"/>
                            &nbsp;Reload
                          </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}

export default IndividualQuery;
