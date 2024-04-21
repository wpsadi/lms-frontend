import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
// import { FaHome } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { IoMdMail } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { resendVerification } from "@/appwrite/user/createVerification";

function UserProfile() {
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [shown, setShown] = useState(false);

  if (userInfo.verified === false && shown === false) {
    setShown(true);
    //
  }

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
                : !userInfo.verified && (<>Please Verify your email first</>)}
            </p>

            <div className="modal-action">
              {userInfo && userInfo.isLoggedIn ? (
                !userInfo.verified ? (<>
                                  <button
                    className="btn"
                    onClick={async (evt) => {
                      const resend = await resendVerification();
                      if (resend.status === 200) {
                        toast.success("Verification mail sent");
                      }
                      else{
                        toast.error("Failed to send mail");
                      }

                      evt.target.classList.add("hidden")
                      
                    }}
                  >
                    Resend Mail {" "}
                    <span>
                    <IoMdMail className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                       
                        />
                    </span>
                  </button>
                </>) : (<>
                                <>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn" id="userModalClose">Close</button>
                  </form>
                </></>)
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
      </DefaultLayout>
    </>
  );
}

export default UserProfile;
