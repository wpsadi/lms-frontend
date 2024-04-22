import NavbarF from "@/comp/Navbar"
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast"

// eslint-disable-next-line react/prop-types
function DefaultLayout({children}){
 
    // const [loading,setLoading] = useState(true);


    // useEffect(()=>{
    //     setLoading(true)
    //     const interval = setInterval(() => {
    //         if (!loading) {
    //             clearInterval(interval);
    //             return;
    //         }
    //     }, 100);
    // }, [loading]);

    // toast.promise(
    //     (()=>{
    //         return new Promise((resolve, reject) => {
    //             // Perform your asynchronous task here
    //             // Resolve or reject the promise based on the result
    //             // For example:
    //             setTimeout(() => {
    //                 //(loading)
    //                 if (!loading) {
    //                     resolve('success');
    //                 } else {
    //                     reject('Facing Problem while loading... try again');
    //                 }
    //             }, 500);
    //         });
    //     })(),
    //     {
    //         loading: 'Loading page ...',
    //         success: 'success',
    //         error: 'Facing Problem while loading... try again',
    //     }
    // );


    return (<>
    <NavbarF>
        
        <div>
        {children}
        </div>

        
    </NavbarF>



    </>)
}
export default DefaultLayout