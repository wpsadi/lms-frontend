import DefaultLayout from "@/Layouts/DefaultLay";
import { CiCircleInfo } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
// import stringy from "string";/
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UpdateUserQueryApp } from "@/appwrite/user/updateQuery";
import { CreateQueryApp } from "@/appwrite/db/Helpdesk/createQuery";
import { fetchUser } from "@/Redux/slices/userSlice";
import { GetAllUserQueriesApp } from "@/appwrite/db/Helpdesk/getAllUserQueries";
import { AiOutlineLoading } from "react-icons/ai";
// import { Dropdown } from "flowbite-react";
import QueryLogTable from "@/comp/QueryLog";
import { updateRaisedQuery } from "@/Redux/slices/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

function ContactUs() {
  
  const [data, setData] = useState(null);

  const [loadingAllQueries, setLoadingAllQueries] = useState(false);

  const [active, isActive] = useState( true);
  const navigate = useNavigate();


  const [once, setOnce] = useState(false);
  const userInfo = useSelector((state) => state.user);

  const [checkUser, setCheckedUser] = useState(false);

  const dispatch = useDispatch();
  const action  = bindActionCreators({updateRaisedQuery},dispatch);


  // useEffect(()=>{
  //   if (userInfo.isLoggedIn === true){
  //     dispatch(fetchUser(false));
  //   }
  // },[dispatch,userInfo])


  useEffect(() => {
    
    if (userInfo.isLoggedIn ) {
      if (!checkUser) {
        dispatch(fetchUser(false));
        // isActive(userInfo.all.prefs.raisedQuery != "false");
        setCheckedUser(true);
      }
      if (userInfo.verified === false) {
        navigate("/userError", {
          state: {
            next: "/contact",
          },
        });
      }
      if (once === false) {


        if (loadingAllQueries === false) {
          toast.promise(
            (async () => {
              setLoadingAllQueries(true);
              const querySet = await GetAllUserQueriesApp();
              setData(querySet.resp);



              isActive(userInfo.all.prefs.raisedQuery);
              
              setOnce(true);
              setLoadingAllQueries(false);
            })(),
            {
              loading: "Loading Queries",
              success: "Loaded Queries",
              error: "Failed to load Queries",
            }
          );
        }
      }
    }

    return;
  }, [once, checkUser, dispatch, userInfo, navigate, data, loadingAllQueries]);

  return (
    <>
      <DefaultLayout>
        <Link to="/contact">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            Contact Us
          </h3>
        </Link>

        <section className="bg-white dark:bg-gray-900">
          <div className="py-5 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Have a Query ?
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                We are not a big company still we always try to get back to
                solve our customers queries as fast as possible.
                <br />
                Please be Patient and we will get back to you as soon as
                possible.
              </p>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Submit Your Query
                </h2>

                <form
                  className="mt-8 space-y-6"
                  action="#"
                  onSubmit={async (evt) => {

                    evt.preventDefault();

                    

                    const formData = new FormData(evt.target); // Access the form's elements

                    // Convert formData to a plain object
                    const formDataObject = {};
                    formData.forEach((value, key) => {
                      formDataObject[key] = value;
                    });
                    

                    if (userInfo.isLoggedIn === false) {
                      return toast.error("Please Sign In to raise a query");
                    }

                    // setCheckedUser(false)


           
                    if (active != false) {
                      return toast.error(
                        "You have previously raised a query. Please wait for the response"
                      );
                    }

                    toast.promise(
                      (async () => {
                        // setOnce(false);
                        isActive(true);
                        const push1 = await CreateQueryApp({
                          email: userInfo.user,
                          query: formDataObject.query,
                        });
                        const push2 = await UpdateUserQueryApp(true);

                        console.log(push1, push2);
                        if (push2.status === 200 && push1.status === 200) {
                          
                          setOnce(false);
                          action.updateRaisedQuery();
                          // console.log(userInfo)
                          return Promise.resolve();
                        } else {
                          return Promise.reject();
                        }
                      })(),
                      {
                        loading: "Raising Query",
                        success: "Query Raised Successfully",
                        error: "Failed to raise Query",
                      }
                    );
                  }}
                >
                  <div>
                    <div className="my-0 text-md font-mono underline italic">
                      We would like you to know this
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-circle btn-ghost btn-xs text-info"
                        >
                          <svg
                            tabIndex={0}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <div
                          tabIndex={0}
                          className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
                        >
                          <div tabIndex={0} className="card-body">
                            <h2 className="card-title">
                              We collect your data!
                            </h2>
                            <p>
                              We don&apos;t want to scare you. When raising a Query,
                              to make sure our resources are not mis-used. we
                              collect some data (mainly <b>IP</b>)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      {...(userInfo.user
                        ? { disabled: true }
                        : {
                            disabled: false,
                          })}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      defaultValue={userInfo.user}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="query"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your query
                    </label>
                    <textarea
                      name="query"
                      id="query"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Please enter your query here..."
                      required
                    />
                  </div>
                  {/* <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required />
                        </div>
                        <div className="ms-3 text-sm">
                        <label htmlFor="remember" className="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
                        </div>
                        <a href="#" className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div> */}
                  <button
                    type="submit"
                    className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Raise Query
                  </button>
                  <div className="text-sm font-medium text-gray-600 dark:text-white">
                    <span className="flex items-center gap-2">
                      <CiCircleInfo className="inline text-2xl" /> We will reply
                      to your query on the email provided by you.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-3">
            {loadingAllQueries === true && (
              <>
                <div
                  className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <AiOutlineLoading
                    className="flex-shrink-0 inline w-4 h-4 me-3 animate-spin"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                  <div>
                    <span className="font-medium">Please be patience</span>{" "}
                    Looking into past is boring but still it&apos;s our job
                  </div>
                </div>
              </>
            )}

            {data !== null && data.total > 0 && (
              <>
                <div className="mt-2">
              <QueryLogTable queries = {data} reload={setOnce}/>
                </div>
              </>
            )}
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export default ContactUs;
