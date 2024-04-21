import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();


    useEffect(()=>{
        document.getElementById('modal_btn_error').click()
    },[])
  return (
    <>
      <DefaultLayout>
      <Link to="#">
        <h3 className="font-mono font-bold italic underline dark:text-white">
            Error
        </h3>
        </Link>
        <br />
        <div
          role="alert"
          className="py-5 alert alert-error text-white transition duration-75 "
        >
          <GoAlertFill />
          <span>Unfortunately! This Page doesn&apos;t Exist</span>
        </div>

        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn hidden " id="modal_btn_error" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box font-mono">
    <h3 className="font-bold text-lg">Error 404</h3>
    <p className="py-4">Page not found. Please recheck the URL</p>
    <div className="modal-action">
    <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn" onClick={()=>{
                    
                    navigate("/")

                  }}>Return  <FaHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 "/></button>
                </form>
    </div>
  </div>
</dialog>
        </div>
      </DefaultLayout>
    </>
  );
}

export default ErrorPage;
