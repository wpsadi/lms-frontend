import DefaultLayout from "@/Layouts/DefaultLay";
import { fetchUser } from "@/Redux/slices/userSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import emailVal from "email-validator"
import { createRecoverPasswordApp } from "@/appwrite/user/recoverPassword";

function ForgotPassword() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loadingMessage,setLoadingMessage] = useState("Checking login Status just for formality");

  const [once, setOnce] = useState(false);
  const [shouldICheckStatusNow, setShouldICheckStatusNow] = useState(false);

  useEffect(() => {
    if (!once) {
      (async () => {
        setOnce(true);
        await dispatch(fetchUser(false));

        setShouldICheckStatusNow(true);
      })();
    }

    if (shouldICheckStatusNow) {
      if (userInfo && userInfo.isLoggedIn) {
        navigate("/user");
      }
    }
  }, [once, shouldICheckStatusNow, userInfo, dispatch, navigate]);

  const [isActive, setIsActive] = useState(false);
  return (
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
                    to="/user"
                    className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    User Profile
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
                    to={`/user/forgot-password`}
                    className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Forgot Password
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </h3>
      </nav>

      <section className="bg-white dark:bg-gray-800">
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
              Forgot Password
            </h2>
            <div className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              We provide recovery option so that you never stay logged out of
              your account
              <div className="text-sm">
                <div
                  onClick={() => {
                    navigate("/signin");
                  }}
                  className="font-medium cursor-pointer text-blue-600 mt-4 dark:text-blue-500 hover:underline"
                >
                  Back to Sign In
                </div>
              </div>
            </div>
            {shouldICheckStatusNow === false  && (
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

            {shouldICheckStatusNow && !userInfo.isLoggedIn && (
              <>
                <form
                  action="#"
                  className="space-y-8"
                  onSubmit={async (evt) => {
                    evt.preventDefault();

                    if (isActive) {
                      toast.error(
                        "Please wait for the previous request to complete"
                      );
                      return;
                    }

                    const formData = new FormData(evt.target); // Access the form's elements

                    // Convert formData to a plain object
                    const formDataObject = {};
                    formData.forEach((value, key) => {
                      formDataObject[key] = value;
                    });

                    if (
                      !emailVal.validate( formDataObject.email)
                    ) {
                      toast.error("Email is Invalid");
                      return;
                    }

                    setIsActive(true);
                    try {
                      setLoadingMessage("We are processing your request")  
                      setShouldICheckStatusNow(false)
                      
                      const update = await createRecoverPasswordApp(formDataObject.email);
                      if (update.status === 200) {
                        toast.success("A recovery mail has been sent to the provided email service");
                        evt.target.reset();
                        // document.getElementById("pass-reset-btn").classList.add("invisible")
                        navigate("/signin");
                        dispatch(fetchUser(false));
                      } else {
                        throw new Error(update.resp);
                      }
                    } catch (e) {
                      toast.error(e.message);
                    }
                    
                    setShouldICheckStatusNow(true)
                    setLoadingMessage("Checking login Status just for formality")

                    setIsActive(false);
                  }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Your Email here..."
                      required
                    />
                  </div>
                  <button
                  id="pass-reset-btn"
                    type="submit"
                    className="py-3 px-5 text-sm font-medium text-center bg-blue-500 text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Proceed Further
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </section>
    </DefaultLayout>
  );
}

export default ForgotPassword;
