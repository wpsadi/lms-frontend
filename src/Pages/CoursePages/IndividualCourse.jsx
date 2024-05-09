import { GetSpecificCourses } from "@/appwrite/db/course/getSpecificCourse";
import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoAlertFill } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading, AiOutlineLoading3Quarters } from "react-icons/ai";
import courseNA from "@/assets/img_na.jpeg";
import { MdAdminPanelSettings, MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Stackedit from "stackedit-js";
// import { purifyIt } from "@/helpers/domPurify";
import { createHTMLBlob } from "../../helpers/createHTMLBob";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { env } from "@/env";
import { createOrder } from "@/helpers/createOrder";
import { dbs, ID } from "@/appwrite/config";
import { getUserPurchasedCourses } from "@/Redux/slices/userSlice";

function IndividualCourse() {
  const navigate = useNavigate();
  const [hidePurchase,setHidePurchase] = useState(false) 

  const userInfo = useSelector((state) => state.user);

  const [options, setOptions] = useState(null);

  const [isActive, setActive] = useState(false);

  const [isPurchased, setIsPurchased] = useState(true);
  const dispatch = useDispatch();

  const category = () => {
    return (
      <>
        {data.category.map((cat, index) => (
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
      </>
    );
  };
  const { courseID } = useParams();

  const [once, setOnce] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      const desc = document.getElementById("desc");
      const stackedit = new Stackedit();
      stackedit.openFile(
        {
          name: "Filename",
          content: { text: data.desc },
        },
        true /* silent mode */
      );

      stackedit.on("fileChange", (file) => {
        // desc.setAttribute("referrerPolicy", "same-origin");
        desc.setAttribute(
          "src",
          createHTMLBlob(
            file.content.html,
            `
        body{
          font-family: 'Inter', sans-serif;
          
          height:fit-content;
        }
        `
          )
        );
      });
    }
  }, [data]);

  const [runRazor, setRazor] = useState(false);

  useEffect(() => {
    if (once) {
      setOnce(false);
      (async () => {
        toast.promise(
          (async () => {
            const push = await GetSpecificCourses(courseID);

            if (push.status === 200) {
              console.log("hidvubdhvb");
              if (runRazor === false) {
                setRazor(true);
                console.log("hidvubdhvb");
                (async () => { 
                  const CallOrderData = await createOrder(courseID,setHidePurchase);
                  const OrderData = await CallOrderData.resp.resp;

                  // console.log(CallOrderData.data.status)
                  if (CallOrderData.status === 200) {
                    setIsPurchased(false);
                    setOptions({
                      key: env.rzp_key_id, // Enter the Key ID generated from the Dashboard
                      amount: push.resp.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                      currency: push.resp.currency,
                      name: "LMS - Wpsadi", //your business name
                      description: push.resp.title,
                      // "image": "https://example.com/your_logo",
                      order_id: OrderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                      callback_url: env.coursePurchaseCallback,
                      prefill: {
                        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                        name: userInfo.name, //your customer's name
                        email: userInfo.user,
                      },
                      theme: {
                        color: "#3399cc",
                      },
                    });
                  } else {
                    setOptions({
                      resp: "not found",
                    });
                  }
                })();
              }

              setData(push.resp);

              return Promise.resolve();
            } else {
              console.log(push)
              return Promise.reject();
            }
          })(),
          {
            loading: "Loading...",
            success: "Course Loaded",
            error: "Failed to Load Course",
          }
        );
      })();
    }
  }, [courseID, once, data, userInfo.name, userInfo.user, runRazor]);

  return (
    <>
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
                      to="/courses"
                      className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Courses
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
                      to={`/courses/${courseID}`}
                      className="ms-1 font-medium text-black md:ms-2 dark:text-gray-400"
                    >
                      {courseID}
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </h3>
        </nav>

        {once === true ? (
          <>
            <div
              className="flex  items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <AiOutlineLoading
                className="flex-shrink-0 inline w-4 h-4 me-3 animate-spin"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
              <div>
                <span className="font-medium">Please be patience</span> We are
                search the depths of the seas for the course you requested
              </div>
            </div>
          </>
        ) : (
          <>
            {data === null ? (
              <>
                <div
                  role="alert"
                  className="py-5 alert alert-error text-white transition duration-75 "
                >
                  <GoAlertFill />
                  <span>Course doesn&apos;t Exist !</span>
                </div>
              </>
            ) : (
              <>
                {userInfo.isLoggedIn &&
                  userInfo.all &&
                  userInfo.all.labels.length > 0 &&
                  userInfo.all.labels.includes("admin") && (
                    <>
                      <div
                        className="flex items-center flex-row justify-between p-4 mt-2 text-md text-green-600 rounded-lg  bg-blue-50 dark:bg-gray-800 dark:text-green-200"
                        role="alert"
                      >
                        <div className="flex items-center">
                          <MdAdminPanelSettings
                            className="flex-shrink-0 inline me-3 text-3xl "
                            aria-hidden="true"
                          />
                          {/* <span className="sr-only">Hi ADMIN!</span> */}
                          <div>
                            <span className="font-medium">
                              Hi <u>ADMIN</u> ! Here are some actions that you
                              can do :
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2 text-lg">
                          <button
                            onClick={() => {
                              navigate(`/courses/${courseID}/edit`);
                            }}
                            className="btn bg-blue-600 text-white hover:bg-blue-800  active:bg-blue-400"
                          >
                            Edit <FaEdit />
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/courses/${courseID}/delete`);
                            }}
                            className="btn bg-red-600 text-white hover:bg-red-800  active:bg-red-400"
                          >
                            Delete <RiDeleteBin2Fill />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                <div className="hero min-h-screen bg-base-200">
                  <div className="hero-content flex-col lg:flex-row-reverse ">
                    <div className="text-center lg:text-left">
                      <h1 className="text-5xl font-bold">{data.title}</h1>
                      <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>
                      <div className="flex justify-start gap-2 mt-2 flex-wrap">
                        {category()}
                      </div>
                      <div className="m-0 h-0 w-0 p-0 border-[0px] "></div>
                      <div>
                        <a href={`#main-card`}>
                          <button className="btn mb-3 hover:bg-green-600 bg-green-600 text-white font-semibold fon-mono">
                            Move to Purchase Option
                          </button>
                        </a>
                      </div>
                      <div className="mockup-window border bg-base-300 ">
                        <div className="flex items-center flex-col px-4 py-2 bg-base-200">
                          <p className="invisible h-0 ">{data.desc}</p>
                          <iframe
                            id="desc"
                            className="py-2 w-full min-h-[20em] max-h-[500px]"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 "
                      id="main-card"
                    >
                      <div className="card-body">
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <a className="bg-transparent block p-2">
                            <img
                              className=" rounded-lg w-full "
                              src={(() => {
                                // console.log(data.thumbnail)
                                return ["", null, undefined].includes(
                                  data.thumbnail
                                )
                                  ? courseNA
                                  : data.thumbnail;
                              })()}
                            />
                          </a>
                          <div className="px-5 pb-5">
                            <a href="#">
                              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {data.title}
                              </h5>
                            </a>
                            <div className="flex items-center mt-2.5 mb-5">
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                              </div>
                              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                5.0
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {Number(data.price) === 0 ? (
                                  "Free"
                                ) : (
                                  <>
                                    {data.currency} {data.price}
                                  </>
                                )}
                              </span>
                              {userInfo.isLoggedIn &&
                                userInfo.verified &&
                                isPurchased && options!=null &&(
                                  <>
                                    <button
                                      onClick={(evt) => {

                                        evt.preventDefault();

                                        if (userInfo.isLoggedIn === false) {
                                          toast.error(
                                            "Please login before purchasing the course"
                                          );
                                          return;
                                        }

                                        if (!userInfo.verified) {
                                          toast.error(
                                            "Please verify your email before purchasing the course"
                                          );
                                          return;
                                        }

                                        if (!isPurchased) {
                                          toast.error(
                                            "Please Purchase this course"
                                          );
                                          setActive(false);
                                          return;
                                        }

                                        navigate(`/learn/${data.$id}`);
                                      }}
                                      className="text-white btn btn-primary bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      Watch Lectures
                                    </button>
                                  </>
                                )}
                              {!hidePurchase && (
                                <>
                                  <button
                                    onClick={(evt) => {
                                      evt.preventDefault();

                                      if (isActive) {
                                        toast.error(
                                          "Processing previous click"
                                        );
                                        return;
                                      }

                                      if (options === null) {
                                        return;
                                      }

                                      if (userInfo.isLoggedIn === false) {
                                        toast.error(
                                          "Please login before purchasing the course"
                                        );
                                        return;
                                      }

                                      if (!userInfo.verified) {
                                        toast.error(
                                          "Please verify your email before purchasing the course"
                                        );
                                        return;
                                      }

                                      setActive(true);
                                      // eslint-disable-next-line no-undef
                                      if (Number(data.price) == 0) {
                                        const purchasedCourse = (() => {
                                          const res = new Array();
                                          const orders =
                                            userInfo.purchases.documents;
                                          orders.forEach((item) => {
                                            if (item.payment == "done") {
                                              res.push(item.courses.id);
                                            }
                                          });

                                          // userInfo.purchased.documents.forEach((doc)=>{
                                          //   res.push(doc.courses.id)
                                          // })
                                          return res;
                                        })();
                                        if (
                                          !purchasedCourse.includes(data.$id)
                                        ) {
                                          (() => {
                                            toast.promise(
                                              dbs.createDocument(
                                                env.CoreDatabaseId,
                                                env.paymentsCollectionId,
                                                ID.unique(),
                                                {
                                                  order_id: "FREE",
                                                  userID: userInfo.all.$id,
                                                  email: userInfo.all.email,
                                                  payment: "done",
                                                  courses: data.$id,
                                                }
                                              ),
                                              {
                                                loading: "Processing...",
                                                success: "Course Purchased",
                                                error:
                                                  "Failed to purchase course",
                                              }
                                            );
                                            dispatch(
                                              getUserPurchasedCourses(false)
                                            );
                                            setActive(false);
                                          })();
                                        } else {
                                          toast.error(
                                            "You have already purchased this course"
                                          );
                                          setActive(false);
                                          return;
                                        }

                                        return;
                                      }

                                      if (isPurchased) {
                                        toast.error(
                                          "You have already purchased this course"
                                        );
                                        setActive(false);
                                        return;
                                      }

                                      // eslint-disable-next-line no-undef
                                      const rzp1 = new Razorpay(options);
                                      rzp1.open();
                                      rzp1.on("payment.failed", function () {
                                        toast.error("Payment Failed");
                                        setActive(false);
                                      });

                                      rzp1.on("payment.success", function () {
                                        toast.success("Payment Success");
                                        setActive(false);
                                      });

                                      rzp1.on("modal.ondismiss", function () {
                                        toast.success("Payment Success");
                                        setActive(false);
                                      });

                                      setActive(false);
                                    }}
                                    className="text-white btn btn-primary bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                    {options === null ? (
                                      <>
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                      </>
                                    ) : (
                                      <>
                                        Purchase <MdOutlineShoppingBag />
                                      </>
                                    )}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="px-5 pb-3">
                            <span className="font-bold font-mono">
                              Course by:{" "}
                              <span className="underline italics font-normal">
                                {data.createdBy}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="form-control mt-6">
                          {userInfo.isLoggedIn === false && (
                            <>
                              <Link to="/signin" className="btn btn-primary">
                                SignIn
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </DefaultLayout>
    </>
  );
}

export default IndividualCourse;
