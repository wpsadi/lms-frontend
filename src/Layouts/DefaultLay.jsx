
import NavbarF from "@/comp/Navbar"
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast"

// eslint-disable-next-line react/prop-types
function DefaultLayout({children}){
 


    return (<>
    <NavbarF>
        
        <div>
        {children}
        </div>
        

        
    </NavbarF>




    </>)
}
export default DefaultLayout