import UserErrModal from "@/helpers/modal";
import DefaultLayout from "@/Layouts/DefaultLay";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { GoAlertFill } from "react-icons/go";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function UserRelatedError() {
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const location = useLocation();
  let next = "/signin";
  try{
    next = location.state.next;
  }
  catch(e){
    null
  }

  //   const [once, setOnce] = useState(false);
  useEffect(() => {
    // const m_off = document.getElementById("user-modal-close");
    if (userInfo.isLoggedIn === true) {
      null;
      // navigate("/signin")
    }
    if (userInfo.verified === false) {
      toast.error("You need to verify your email first", {});
    }
    if (userInfo.isLoggedIn === false) {
      document.getElementById("my_modal_1").showModal();
    }

    if (userInfo.isLoggedIn === true && userInfo.verified === true) {
      document.getElementById("userModalClose").click();
    }
  }, [userInfo]);

  if (userInfo.isLoggedIn === true) {
    navigate(next)
    // console.log(userInfo)
    return (
      <>
        <>
          <UserErrModal />
        </>
        <div className="m-3">
          You are not supposed to be here
          <br />
          <Button
            onClick={async () => {
              // evt.preventDefault();

              navigate(next);
            }}
            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Go to Next Page
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <DefaultLayout>
          <>
            <UserErrModal />
          </>
          {userInfo && !userInfo.isLoggedIn && (
            <>
              <div
                role="alert"
                className="py-5 alert alert-error text-white transition duration-75 "
              >
                <GoAlertFill />
                <span>Please Login first</span>
              </div>
            </>
          )}

          {userInfo && !userInfo.isLoggedIn !== true ? (
            !userInfo.verified && (
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
            )
          ) : (
            <></>
          )}
        </DefaultLayout>
      </>
    );

    // navigate(next)
  }
}

export default UserRelatedError;
