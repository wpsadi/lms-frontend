import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./Router/routes";
import Notice from "@/contexts/notice";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Analytics } from "@vercel/analytics/react"
import { fetchUser } from "./Redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();

  const [searchedOnce, setSearchedOnce] = useState(null);

  useEffect(() => {
    if (searchedOnce !== true) {
      (async () => {
        // //("hi")
        dispatch(fetchUser(false))
        setSearchedOnce(true);
      })();
    }
  }, [ searchedOnce, dispatch]);

  const [isShown, setIsShown] = useState(false);
  return (
    <>
    <BrowserRouter >
        <Notice.Provider value={{ isShown, setIsShown }}>
          <CustomRoutes/>
          <Toaster />
          <Analytics/>
        </Notice.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
