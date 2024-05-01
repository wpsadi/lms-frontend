
import { UpdateUserProfileApp } from "@/appwrite/user/updateProfile";
import DefaultLayout from "@/Layouts/DefaultLay";
import { fetchUser } from "@/Redux/slices/userSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user)
  const loadingMessage= "Processing your request..."

  const location = useLocation();
  let referrer = location.state?.referrer || "";
  useEffect(() => {
    if (referrer !== "/user") {
      navigate("/user");
    }
  }, [referrer, navigate]);

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
                    to={`/user/update-profile`}
                    className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Update Profile
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
              Update Profile
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              Make Changes to your profile
              <div className="text-sm">
              <div onClick={()=>{
          navigate("/user/update-password",{state:{referrer:"/user"}})
        }} className="font-medium cursor-pointer text-blue-600 mt-3 dark:text-blue-500 hover:underline">Update Password</div>
              </div>
            </p>
            {isActive === true && (
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


                setIsActive(true);
                try {
                  const update = await UpdateUserProfileApp({...formDataObject}
                  );
                  if (update.status === 200) {
                    toast.success("Password updated");
                    evt.target.reset();
                    navigate("/user");
                    dispatch(fetchUser(false))
                  } else {
                    throw new Error(update.resp);
                  }
                } catch (e) {
                  toast.error(e.message);
                }

                setIsActive(false);
              }}
            >
              <div>
                <label
                  htmlFor="old-firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  First name
                </label>
                <input
                  name="firstname"
                  type="text"
                  id="firstname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  defaultValue={userInfo.all.prefs.firstname}
                  required
                  maxLength={64}
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  name="lastname"
                  type="text"
                  id="lastname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  defaultValue={userInfo.all.prefs.lastname}
                  required
                  maxLength={64}
                />
              </div>
              <button
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center bg-blue-500 text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update Profile
              </button>
            </form>
          </div>
        </section>
      </section>
    </DefaultLayout>
  );
}

export default UpdateProfile;
