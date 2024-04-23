import { resendVerification } from "@/appwrite/user/createVerification";
import toast from "react-hot-toast";
import { IoMdMail } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function UserErrModal(){
    const navigate = useNavigate()
    const userInfo  = useSelector(state=>state.user)
    return (<>
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
    </>)
}

export default UserErrModal