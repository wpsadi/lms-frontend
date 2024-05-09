import DefaultLayout from "@/Layouts/DefaultLay";
import { Link, useParams } from "react-router-dom";

import {  useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import { Replay } from "vimond-replay";
import "vimond-replay/index.css";
import { createLecturesApp } from "@/appwrite/db/lectures/createLecture";

function CreateLecture() {
  window.TAGIFY_DEBUG = false;
  const [isActive,setIsActive] = useState(false)
  const [loadingMessage,setLoadingMessage] = useState("making things ready for you...");

  const [loading, setLoading] = useState(false);

  const [ImageURL,setImageURL] = useState(null)

  // eslint-disable-next-line no-unused-vars
  const [invalidMessage,setInvalidMessage] = useState(null)



  const desc= "Here it begins..."

  const {courseID} = useParams();



  return (
    <>
      <DefaultLayout>
        <nav className="mb-2 ">
          <h3 className="font-mono font-bold italic underline dark:text-white">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse flex-wrap">
                <li>
                  <div className="flex items-center">
                    {/* <svg className="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
</svg> */}
                    <Link
                      to={`/learn/${courseID}`}
                      className="ms-1 font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Lectures
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
                      to={`/learn/${courseID}/new`}
                      className="ms-1 font-medium text-black md:ms-2 dark:text-gray-400"
                    >
                      Create
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </h3>
        </nav>
        {loading === true && (
          <>
            <div
              className="flex items-center p-4 mb-4 mt-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
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

        <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Add Lecture
              </h2>
              <form
              id="courseForm"
                onSubmit={async (evt) => {
                  evt.preventDefault();


                  const formData = new FormData(evt.target); // Access the form's elements

                  // Convert formData to a plain object
                  const formDataObject = {};
                  formData.forEach((value, key) => {
                    formDataObject[key] = value;
                  });


                  formDataObject["courseID"] = courseID

                  console.log(formDataObject)




                  if (isActive){
                    return
                  }
                  setIsActive(true);
                  setLoading(true);
                  setLoadingMessage("Adding Lecture...");
                  (async ()=>{
                    

                    const push = await createLecturesApp(formDataObject);
                    setIsActive(false);
                    setLoading(false);
                    setLoadingMessage("making thngs ready for you...")
                    if (push.status=== 200){
                        toast.success("Lecture Added Successfully");
                        setImageURL(null)
                        evt.target.reset()
                    }
                    else{
                        toast.error(push.resp);
                    }



                  })()



                }}
              >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Lecture Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 placeholder:italic"
                      placeholder="title here"
                      required
                    />
                  </div>
                  
                <div className={`${(()=>{
                  if (ImageURL !== null){
                    return "sm:col-span-1"
                  }
                  return "sm:col-span-2"
                })()}`}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Lecture</label>
<input onChange={(evt)=>{
    const file = evt.target.files[0];
    const reader = new FileReader();

    const dataURLtoBlob = (dataURL) => {
      const parts = dataURL.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const array = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return new Blob([array], { type: contentType });
    };


    reader.onload = (e) => {
      const blobImage = dataURLtoBlob(e.target.result);
        const blobURL = URL.createObjectURL(blobImage);
        setImageURL(blobURL);
    }
    reader.readAsDataURL(file);

}} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" name="thumbnail" type="file" accept="video/*" maxLength={1024}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300 " id="file_input_help"> mp4 or ...</p>

                </div>

{
  ImageURL !== null && (<>
  <a href={ImageURL} target="_blank">
  <Replay
                  source={ImageURL}
                  initialPlaybackProps={{ isPaused: true }}
                  className="md:max-w-2xl sm:rounded-lg w-full rounded-lg shadow-xl dark:shadow-gray-800"
                /></a>
  </>)
}
                  


                  <div className="sm:col-span-2">
                    <label
                      htmlFor="desc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="desc-content"
                      rows="8"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="About Course Here"
                      required
                      name="desc"

                      defaultValue={desc}   
                    ></textarea>
                    
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex bg-blue-500  items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Create Lecture
                </button>
              </form>
            </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export default CreateLecture;
