import DefaultLayout from "@/Layouts/DefaultLay";
import { fetchUser } from "@/Redux/slices/userSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link,  Outlet,  useNavigate } from "react-router-dom";

function UserAuthCheck() {
  const [loadingMessage, setLoadingMessage] = useState(
    "trying to load account details"
  );
  const [loadingAllQueries, setLoadingAllQueries] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const [once, setOnce] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [shouldExecutePromise, setShouldExecutePromise] = useState(false);

  const [isAuthorized,setIsAuthorized] = useState(false)

  const [checkUser, setCheckUser] = useState(false);

  const [shouldIRouteFurther,setShouldIRouteFurther] = useState(false)
  useEffect(() => {
    if (checkUser === false) {
      setLoadingAllQueries(true);
      setCheckUser(true);
      (async () => {
        await dispatch(fetchUser(false));
        // console.log(userInfo, "this is new");
        
        setShouldExecutePromise(true);
        setOnce(true)
      })();
      
    }
    if (once && checkUser && shouldExecutePromise) {
        setShouldExecutePromise(false)
      toast.promise(
        (async () => {
        //   setOnce(false);
        
          if (userInfo.isLoggedIn === false) {
            // console.log(userInfo);
            setShouldIRouteFurther(true)
            setLoadingAllQueries(false);
            return Promise.reject("Please Login to go Access this page");
          } else {
            setLoadingMessage("Checking Verification...");
            if (userInfo.verified === false){

                setLoadingAllQueries(false);
                setShouldIRouteFurther(true)
                return Promise.reject("Email Verification Failed");
            
            }
            setLoadingMessage("Checking Access level...");
            // console.log(userInfo.all.labels)
            // if (userInfo.all.labels.includes("admin")) {
              setLoadingAllQueries(false);
              setIsAuthorized(true)
              setShouldIRouteFurther(true)
              
              return Promise.resolve("Access Authorised");
            // } 
            // else {
            //   setLoadingAllQueries(false);
            //   return Promise.reject("Access Denied");
            // }
          }
        })(),
        {
          loading: "Loading",
          success: (msg) => msg,
          error: (e) => e,
        }
      );
    //   setOnce(false)
    }
  }, [dispatch, userInfo, once, checkUser,shouldExecutePromise]);

  if (once === true && checkUser === true && shouldIRouteFurther === true) {
    // console.log("hi")
    if (isAuthorized) {
        return <Outlet/>
    //   return <>f</>;
    }  else {
      // return (<>Unauthorised</>)
      return navigate("/userError",{
          state: { next: "/signin" }
      })
  }
  }

  return (
    <>
      <DefaultLayout>
        <Link to="#">
          <h3 className="font-mono font-bold italic underline dark:text-white"></h3>
        </Link>
        <section className="bg-white dark:bg-gray-900">
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
                  {loadingMessage}
                </div>
              </div>
            </>
          )}
        </section>
      </DefaultLayout>
    </>
  );
}

export default UserAuthCheck;
