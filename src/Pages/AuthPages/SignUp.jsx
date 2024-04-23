import DefaultLayout from "@/Layouts/DefaultLay";
import toast from "react-hot-toast";
import { CiCircleInfo } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import emailVal from "email-validator";
import { createUserApp } from "@/appwrite/user/createAccount.js";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { logoutUser, updateUser } from "@/Redux/slices/userSlice";
import { useEffect, useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [currentSignUp, setCurrentSignUp] = useState(null);
  const userInfo = useSelector((state) => state.user);

  const [isActive,setActive] = useState(false)

  // eslint-disable-next-line no-unused-vars
  function onSubmit(token) {
    document.getElementById("user-sign-up").submit();
  }

  useEffect(() => {
    if (userInfo.isLoggedIn) {
      if (currentSignUp !== true) {
        // toast.error("You are already logged in");
        null;
      }

      navigate("/user");
    }
  });

  const dispatch = useDispatch();
  const action = bindActionCreators({ updateUser, logoutUser }, dispatch);
  async function SignUp(data) {
    const form = {
      name: [
        data.floating_first_name.toLowerCase().trim(),
        data.floating_last_name.toLowerCase().trim(),
      ].join(" "),
      email: data.floating_email.toLowerCase().trim(),
      repeat: data.repeat_password.toLowerCase().trim(),
      password: data.floating_password.toLowerCase().trim(),
      // phone: data.floating_phone.toLowerCase().trim().split("-").join(""),
      firstname: data.floating_first_name.toLowerCase().trim(),
      lastname: data.floating_last_name.toLowerCase().trim(),
    };

    if (emailVal.validate(form.email) === false) {
      toast.error("Invalid email address");
      return;
    }
    if (form.password !== form.repeat) {
      toast.error("Passwords do not match");
      return;
    }
    // if (data.floating_phone.length !== 12){
    //   toast.error("Invalid phone number");
    //   return;
    // }

    try {
      toast.promise(
        (async () => {
          const push = await createUserApp({ ...form }); // Wait for createUserApp to complete
          
          // //(push);
          if (push.status === 200) {
            action.updateUser({
              name: form.firstname,
              user: form.email,
              verified: false,
              isLoggedIn: true,
            });
            setActive(false)
            setCurrentSignUp(true);
            navigate("/user");
            return Promise.resolve(); // Resolve the promise if createUserApp is successful
          } else {
            setActive(false)
            toast.error(push.resp);
            return Promise.reject(); // Reject the promise if createUserApp fails
          }
        })(),
        {
          loading: "Signing up...",
          success:
            "We have sent an email Verification link to your email address. Please verify your email address to continue.",
          error: "Failed to sign up",
        }
      );
    } catch (error) {
      console.error(error);
      Promise.reject();
    }
  }

  return (
    <>
      <DefaultLayout>
        <Link to="/signup">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            Sign Up
          </h3>
        </Link>

        <section className="bg-white dark:bg-gray-900  w-full ">
          <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-10 grid lg:grid-cols-4 gap-8 lg:gap-16 justify-center ">
            <div></div>
            <div className="col-span-2">
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sign Up
                </h2>
                <form
                  className="mt-8 space-y-6"
                  action="#"
                  id="user-sign-up"
                  onSubmit={async (evt) => {
                    evt.preventDefault();
                    const formData = new FormData(evt.target); // Access the form's elements

                    if (isActive){
                      return
                    }

                    setActive(true)

                    // Convert formData to a plain object
                    const formDataObject = {};
                    formData.forEach((value, key) => {
                      formDataObject[key] = value;
                    });

                    await SignUp(formDataObject);
                  }}
                >
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="email"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="password"
                      name="floating_password"
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="password"
                      name="repeat_password"
                      id="floating_repeat_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Confirm password
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
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
                        First name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
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
                        Last name
                      </label>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-1 md:gap-6">
                    {/* <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="tel"
                        pattern="\+[0-9]{1,3}-[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="floating_phone"
                        id="floating_phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone number (+91-123-456-7890)
                      </label>
                    </div> */}
                    {/* <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="floating_company"
                        id="floating_company"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Company (Ex. Google)
                      </label>
                    </div> */}
                  </div>

                  <button
                    type="submit"
                    className="g-recaptcha w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    data-sitekey="reCAPTCHA_site_key"
                    data-callback="onSubmit"
                    data-action="submit"
                  >
                    Sign Up
                  </button>
                  <div className="text-sm font-medium text-gray-600 dark:text-white">
                    <span className="flex items-center gap-2">
                      <CiCircleInfo className="inline text-xl" /> Feel Free to
                      Reach Out to Us in case of any issues.
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Already Registered?{" "}
                    <Link
                      to="/signin"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Sign In here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export default SignUp;
