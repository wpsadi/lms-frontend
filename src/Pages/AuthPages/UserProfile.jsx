import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
// import { FaHome } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { RxReload } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import stringy from "string"
import { IoMdMail } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { resendVerification } from "@/appwrite/user/createVerification";
import { SetUpUser } from "@/appwrite/user/getUserDetails";
import { fetchUser } from "@/Redux/slices/userSlice";

function UserProfile() {
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shown, setShown] = useState(false);

  const [refetchUser,setRefetchUser] = useState(false)

  if (userInfo.verified === false && shown === false) {
    setShown(true);
    //
  }
  useEffect(()=>{
    if(refetchUser === true){
      dispatch(fetchUser());
      setRefetchUser(false)
      document.getElementById("Resend-btn").classList.remove("hidden");
    }
  },[refetchUser,dispatch])

  useEffect(() => {
    // const m_off = document.getElementById("user-modal-close");
    if (userInfo.isLoggedIn === true) {
      null;
      // navigate("/signin")
    }
    if (userInfo.verified === false) {
      toast.error("You need to verify your email first", {});
    }
    document.getElementById("my_modal_1").showModal();

    if (userInfo.isLoggedIn === true && userInfo.verified === true) {
      document.getElementById("userModalClose").click();
    }
  }, [userInfo]);

  const [loading, setLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const [data,setData] = useState({});

  useEffect(() => {
    if (userInfo.isLoggedIn === true) {
      setLoading(true);
      (async ()=>{
        const user = await SetUpUser();
        if (user.status === 200) {
          setLoading(false);
          setSuccess(true)
          setData(user.resp)
          //(user)
        } else {
          setLoading(false);
          toast.error("Failed to get user details");
        }
      })()
    }

  }, [userInfo.isLoggedIn]);

  return (
    <>
      <DefaultLayout>
        <Link to="/user">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            User Profile
          </h3>
        </Link>
        <br />
        {userInfo && !userInfo.isLoggedIn ? (
          <>
            <div
              role="alert"
              className="py-5 alert alert-error text-white transition duration-75 "
            >
              <GoAlertFill />
              <span>Please Login first</span>
            </div>
          </>
        ) : (
          <>
            <div role="alert" className="alert alert-success text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>User Logged In!</span>
            </div>
          </>
        )}

        {userInfo && !userInfo.isLoggedIn !== true ? (
          !userInfo.verified ? (
            <>
              <div className="mt-1"></div>
              <div
                role="alert"
                className="py-5 alert alert-error text-white transition duration-75 "
              >
                <GoAlertFill />
                <span>Email Not Verified</span>
              </div>
            </>
          ) : (
            <>
              <div className="mt-1"></div>
              <div role="alert" className="alert alert-success text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Email Verified!</span>
              </div>
            </>
          )
        ) : (
          ""
        )}

        <button className="btn hidden">open modal</button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Code 401</h3>
            <p className="py-4">
              {userInfo && !userInfo.isLoggedIn
                ? "Please Login first"
                : !userInfo.verified && <>Please Verify your email first</>}
            </p>

            <div className="modal-action">
              {userInfo && userInfo.isLoggedIn ? (
                !userInfo.verified ? (
                  <>
                                      <button
                      className="btn"
                      onClick={async () => {
                        if (refetchUser === false){
                          setRefetchUser(true)
                        }
                      }}
                    >
                      Reload {" "}
                      <span>
                      <RxReload 
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                    <button
                    id="Resend-btn"
                      className="btn"
                      onClick={async (evt) => {
                        const resend = await resendVerification();
                        if (resend.status === 200) {
                          toast.success("Verification mail sent");
                        } else {
                          toast.error("Failed to send mail");
                        }

                        evt.target.classList.add("hidden");
                      }}
                    >
                      Resend Mail{" "}
                      <span>
                        <IoMdMail
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" id="userModalClose">
                          Close
                        </button>
                      </form>
                    </>
                  </>
                )
              ) : (
                <>
                  <button
                    className="btn"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign In{" "}
                    <span>
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                        />
                      </svg>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </dialog>

        {userInfo && userInfo.isLoggedIn && (loading === false) && (success===true) && (
          <>
            <div className=" w-full   mt-1  ">
              <div className="flex flex-col place-items-center">
                <div className="w-full  lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    User Profile
                  </h2>
                  <div className="mt-8 space-y-3" action="#">
                    <div className="relative  h-10 flex items-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg
                        className="absolute w-12 h-12 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div className="pl-12 w-full  font-bold font-mono text-2xl text-black dark:text-white">
                        {(data.name).toUpperCase()}
                      </div>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        placeholder=""
                        disabled
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 mt-4 pt-5  pb-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address : <br/><span className="text-black flex justify-center  dark:text-gray-400 font-bold font-mono"><div>{data.email}</div></span>
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          disabled
                          name="floating_first_name"
                          id="floating_first_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_first_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First name : <span className="text-black dark:text-gray-400 font-bold font-mono">{data.prefs.firstname? stringy(data.prefs.firstname).capitalize().s:"---" }</span>
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          disabled
                          type="text"
                          name="floating_last_name"
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_last_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name : <span className="text-black dark:text-gray-400 font-bold font-mono">{data.prefs.lastname? stringy(data.prefs.lastname).capitalize().s:"---" }</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-1 md:gap-6">

                    </div>


                    
                    
                  </div>
                  {userInfo && userInfo.isLoggedIn && (loading === false) && (success===true) && (userInfo.verified === true) && (
          <>
            <div className=" w-full   mt-1  ">
              <div className="flex flex-row justify-between items-center">
                
        <div onClick={()=>{
          navigate("/user/update-password",{state:{referrer:"/user"}})
        }} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Update Password</div>
        <div onClick={()=>{
          navigate("/user/update-profile",{state:{referrer:"/user"}})
        }} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Edit Profile</div>

              </div>
            </div>
          </>
        )}
                </div>
              </div>
            </div>
          </>
        )}


      </DefaultLayout>
    </>
  );
}

export default UserProfile;
