import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./Router/routes";
import Notice from "@/contexts/notice";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "./Redux/slices/userSlice";
import "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"

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
