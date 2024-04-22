import { VerifyEmailApp } from "@/appwrite/user/verifyEmail";
import DefaultLayout from "@/Layouts/DefaultLay";
import { updateUser } from "@/Redux/slices/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch} from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

function VerifyEmail() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  //(userInfo);
  const action = bindActionCreators({ updateUser }, dispatch);

  const [loading,SetLoading] = useState(false);

  const [credAval, setCredAval] = useState(false);

  const [once,setOnce] = useState(false);

  const [success, setSuccess] = useState(false);

  const [query] = useSearchParams();

  const secret = query.get("secret");
  const userId = query.get("userId");

  useEffect(() => {
    if (!!secret && !!userId) {
      setCredAval(true);
      
      if (once === false){
        toast.promise(
          (async () => {
            setOnce(true);
            SetLoading(true);
            try {
              const push = await VerifyEmailApp({ userId, secret });
              SetLoading(false);
              //console.log(push);
              if (push.status === 200) {
                setSuccess(true);
                action.updateUser({
                  verified: true,
                });

                return new Promise.resolve()
                 
              } else {
                setSuccess(false);
                throw new Error(push.resp);
              }
            } catch (e) {
              toast.error(e.message);
              SetLoading(false);

              return new Promise.reject(e);
            }
            
          })(),
          {
            loading: 'loading ...',
            success: "Email Verified",
            error: "Unable to Verify",
          }
        ); 
      }
      
    } else {
      toast.error("Creds not found");
    }
  }, [userId, secret, action,once]);
  
  return (
    <>
      <DefaultLayout>
        <Link to="/verify">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            verify
          </h3>
        </Link>
        <br />
        <div>
          <section className="bg-white dark:bg-gray-900">
            <main className="flex justify-center flex-row items-center  bg-white dark:bg-gray-900">
              <div className="text-center px-3">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  {loading ? "Loading." : (!credAval ? "401" : (success ? "200" : "400"))}

                  </span>{" "}
                  {loading ? "---" : ((!credAval
                    ? "Creds. not Found"
                    : success
                    ? "Success"
                    : "Failed"))}

                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                {loading ? "Loading... ... ..." : ( (!credAval
                    ? "Credentials not found. Please re-check your email for the verification link"
                    : success
                    ? "We have successfully verified your email address"
                    : "Failed to verify to email. Creds. are invalid"))}

                </p>
              </div>
            </main>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}

export default VerifyEmail;
