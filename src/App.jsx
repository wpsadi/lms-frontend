import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./Router/routes";
import Notice from "@/contexts/notice";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUpUser } from "./appwrite/user/getUserDetails";
import { bindActionCreators } from "@reduxjs/toolkit";
import { updateUser } from "./Redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const action = bindActionCreators({updateUser},dispatch)

  const [searchedOnce, setSearchedOnce] = useState(null);

  useEffect(() => {
    if (searchedOnce !== true) {
      (async () => {
        // //("hi")
        const getUser = await SetUpUser();
        if (getUser.status === 200) {
          // //(getUser)
          action.updateUser({
            name:getUser.resp.prefs.firstname,
            user: getUser.resp.email,
            isLoggedIn:true,
            verified: getUser.resp.emailVerification
          })
        }
        setSearchedOnce(true);
      })();
    }
  }, [action, searchedOnce]);

  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Notice.Provider value={{ isShown, setIsShown }}>
          <CustomRoutes></CustomRoutes>
          <Toaster />
        </Notice.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
