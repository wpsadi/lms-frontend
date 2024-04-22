import DefaultLayout from "@/Layouts/DefaultLay";
import { logoutUser, updateUser } from "@/Redux/slices/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import emailVal from "email-validator";
import { LoginUserApp } from "@/appwrite/user/createSession";

function SignIn() {
  const navigate = useNavigate();
  const [currentSignIn, setCurrentSignIn] = useState(null);
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo.isLoggedIn) {
      if (currentSignIn !== true) {
        // toast.error("You are already logged in");
        null
      }

      navigate("/user");
    }
  });
  const dispatch = useDispatch();
  const action = bindActionCreators({ updateUser, logoutUser }, dispatch);
  async function SignIn(data) {
    const form = {
      email: data.email.toLowerCase().trim(),
      password: data.password.toLowerCase().trim(),
    };

    if (emailVal.validate(form.email) === false) {
      toast.error("Invalid email address");
      return;
    }
    // if (data.floating_phone.length !== 12){
    //   toast.error("Invalid phone number");
    //   return;
    // }

    try {
      toast.promise(
        (async () => {
          const push = await LoginUserApp({ ...form }); // Wait for createUserApp to complete
          // //(push);
          if (push.status === 200) {
            //(push.resp);
            
            action.updateUser({
              
              name: push.resp.resp.prefs.firstname,
              user: push.resp.resp.email,
              verified: push.resp.resp.emailVerification,
              isLoggedIn: true,
            });

            //   //("h")
            navigate("/user");
            setCurrentSignIn(true);
            return Promise.resolve(); // Resolve the promise if createUserApp is successful
          } else {
            toast.error(push.resp);
            return Promise.reject(); // Reject the promise if createUserApp fails
          }
        })(),
        {
          loading: "Signing in...",
          success:
            "Logged in",
          error: "Failed to sign up",
        }
      );
    } catch (error) {
        Promise.reject()
      console.error(error);
    }
  }

  return (
    <>
      <DefaultLayout>
        <Link to="/signin">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            Sign In
          </h3>
        </Link>

        <section className="bg-white dark:bg-gray-900  w-full ">
          <div className="py-5 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-4 gap-8 lg:gap-16 justify-center ">
            <div></div>
            <div className="col-span-2">
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sign In
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

                    await SignIn(formDataObject);
                  }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    Sign In
                  </button>
                  <div className="text-sm font-medium text-gray-600 dark:text-white">
                    <span className="flex items-center gap-2">
                      <CiCircleInfo className="inline text-xl" /> Feel Free to
                      Reach Out to Us in case of any issues.
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Not registered yet?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Create account here
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

export default SignIn;
