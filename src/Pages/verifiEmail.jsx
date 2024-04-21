import { VerifyEmailApp } from "@/appwrite/user/verifyEmail";
import DefaultLayout from "@/Layouts/DefaultLay";
import { updateUser } from "@/Redux/slices/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

function VerifyEmail() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const action = bindActionCreators({ updateUser }, dispatch);

  const [credAval, setCredAval] = useState(false);

  const [success, setSuccess] = useState(false);

  const [query] = useSearchParams();

  const secret = query.get("secret");
  const userId = query.get("userId");

  const verify = async () => {
    try {
      const push = await VerifyEmailApp({ userId, secret });
      console.log(push);
    //   if (push.status === 200) {
    //     setSuccess(true);
    //     // action.updateUser({
    //     //   ...userInfo,
    //     //   isLoggedIn: true,
    //     // });
    //     return 200;
    //   } else {
    //     return 400;
    //   }
    return 200
    } catch (e) {
      console.log(e.message)
      return 400
    //   Promise.reject();
    }
  }
//   console.log(secret, userId);

//   if (!!secret && !!userId) {
//     setCredAval(true);
//     toast.promise(async     ()=>{
//         const push = await verify();
//         if(push === 200){
//             return Promise.resolve()
//         }else{
//             return Promise.reject()
//         }
//     }
// ,
//       {
//         loading: "Verifying your email",
//         success: "Email verified successfully",
//         error: "Failed to verify email",
//       }
//     );
//   }

useEffect(()=>{
    if (!!secret && !!userId) {
        setCredAval(true);
        toast.promise(async     ()=>{
            const push = await verify();
            if(push === 200){
                return Promise.resolve()
            }else{
                return Promise.reject()
            }
        }
    ,
          {
            loading: "Verifying your email",
            success: "Email verified successfully",
            error: "Failed to verify email",
          }
        );
      }
},[])

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
                    {!credAval ? "401" : success ? "200" : "400"}
                  </span>{" "}
                  {!credAval
                    ? "Creds. not Found"
                    : success
                    ? "Success"
                    : "Failed"}
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                  {!credAval
                    ? "Credentials not found. Please check your email for the verification link"
                    : success
                    ? "We have successfully verified your email address"
                    : "Failed to verify to email. Creds. are invalid"}
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
