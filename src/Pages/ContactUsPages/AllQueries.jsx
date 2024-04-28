import { GetAllUserQueriesApp } from "@/appwrite/db/Helpdesk/getAllUserQueries";
import QueryLogTable from "@/comp/QueryLog";
import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AllQueries() {
  const loadingMessage=     "trying to fetch records"
  const userInfo = useSelector((state) => state.user);

  const [data,setData] = useState([])

  const [dataLoaded , setDataLoaded] = useState(false) 


  const [loadingAllQueries, setLoadingAllQueries] = useState(false);

  useEffect(() => {
    if (dataLoaded === false && userInfo.isLoggedIn) {
        (async ()=>{
            setLoadingAllQueries(true);
            const pull  = await GetAllUserQueriesApp();
            setData(pull.resp)
    
            setDataLoaded(true)
    
            setLoadingAllQueries(false)
        })()
    }
    if (dataLoaded === false && userInfo.isLoggedIn === false) {
        toast.error("Please Login to go Access this page");
    }
    

  },[dataLoaded,userInfo.isLoggedIn])




  return (
    <>
      <DefaultLayout>
      <nav className="mb-2 ">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li>
                  <div className="flex items-center">
                    {/* <svg className="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
</svg> */}
                    <Link
                      to="/contact"
                      className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Contact Us
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-black mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to={`/queries`}
                      className="ms-1 font-medium text-black md:ms-2 dark:text-gray-400"
                    >
                      {"Queries"}
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </h3>
        </nav>

        <section className="bg-white dark:bg-gray-900">
          {loadingAllQueries === true && (
            <>
              <div
                className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <AiOutlineLoading
                  className="flex-shrink-0 inline w-4 h-4 me-3 animate-spin"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
                <div>
                  <span className="font-medium">Please be patience</span>{" "}
                  {loadingMessage}
                </div>
              </div>
            </>
          )}
          {
            loadingAllQueries === false && dataLoaded === true && <QueryLogTable queries={data} reload={setDataLoaded} />
          }
          
        </section>
      </DefaultLayout>
    </>
  );
}

export default AllQueries;
