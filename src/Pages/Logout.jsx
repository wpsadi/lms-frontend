import DefaultLayout from "@/Layouts/DefaultLay";
import { Link, useNavigate } from "react-router-dom";

// Remove the unused import statement for React
// import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LogOutUserApp } from "@/appwrite/user/logOutAccount";
import { logoutUser, updateUser } from "@/Redux/slices/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

function LogoutUser() {
    const dispatch = useDispatch();
    const action = bindActionCreators({ updateUser, logoutUser }, dispatch);


    const userInfo = useSelector((state) => state.user);
    const [currentLogout,setCurrentLogout] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
      if (!userInfo.isLoggedIn){
        if (currentLogout !== true){
          toast.error("You are not logged in")
        }
        navigate("/signin")
      }
    },[userInfo.isLoggedIn, currentLogout, navigate])
  return (
    <>
      <DefaultLayout>
        <Link to="/logout">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            Logout
          </h3>
        </Link>
        <div className="bg-white dark:bg-gray-900 flex items-center">
          <div className="py-5 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Logout Confirmation</CardTitle>
                <CardDescription>
                  Confirm if you really want to logout!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col items-start space-y-1.5">
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={()=>{
                    navigate("/")
                }}>Will stay</Button>
                <Button onClick={async()=>{
                    // evt.preventDefault();
                    await LogOutUserApp()

                    // update store
                    action.logoutUser()
                    
                    setCurrentLogout(true)
                    toast.success("Logged out successfully")
                    navigate("/signin")
                }} className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default LogoutUser;
