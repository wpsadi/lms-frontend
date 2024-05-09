import DefaultLayout from "@/Layouts/DefaultLay";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import {  useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Replay } from "vimond-replay";
import "vimond-replay/index.css";
import { GetSpecificCourses } from "@/appwrite/db/course/getSpecificCourse";
import { getCourseLectures } from "@/appwrite/db/lectures/getAllLectures";


function LecturePage() {
//   const dispatch = useDispatch();
  const {courseID} = useParams();
  const userInfo = useSelector(state=>state.user)
  const navigate = useNavigate();
  const [members,setMembers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [loadingMessage, setLoadingMessage] = useState(
    "We are loading Your lectures"
  );

  const [loading, setLoading] = useState(false);

  const [once,setOnce] = useState(false)

  const [courseInfo,setCourseinfo] = useState(null)
  const [nowPlaying,setNowPlaying] = useState("#")

  useEffect(()=>{
    if (!once){
        setOnce(true);
        (async()=>{
            setLoading(true)
            const courseData = (await GetSpecificCourses(courseID)).resp
            await setCourseinfo(courseData)
            const LectureData = (await getCourseLectures(courseID)).resp.documents
            // console.log(LectureData)
            await setMembers(LectureData)
            if (LectureData.length > 0){
                // console.log(LectureData[0])
                await setNowPlaying(LectureData[0].rawURL)
            }
          

            setLoading(false)
        })()
        


        
    }
  },[once,courseID])
  return (
    <DefaultLayout>
      <Link to={`/learn/${courseID}`}>
        <h3 className="font-mono font-bold italic underline dark:text-white">
          learn
        </h3>

      </Link>
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
        {
            !loading && (<>
                    <section className="py-14">
          <div className="max-w-screen-xl mx-auto md:px-8">
            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
              <div className="flex-1 sm:mb-5 lg:block">
                {/* <video src={nowPlaying} controls></video> */}
                <Replay
                  source={nowPlaying}
                  initialPlaybackProps={{ isPaused: true }}
                  // className="md:max-w-2xl sm:rounded-lg"
                />
              </div>
              <div className="max-w-xl flex-[0.5] px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <div className="max-w-2xl mx-auto px-4">
                  <div className="items-start justify-between sm:flex">
                    <div>
                      <h4 className="text-gray-800 text-2xl font-semibold">
                        {
                            courseInfo && courseInfo.title || "title here..."
                        }
                      </h4>
                      <p className="mt-2 text-gray-600 text-base sm:text-sm line-clamp-2">
                      {
                            "Watch the lecture at your own pace"
                        }
                      </p>
                    </div>
                    {
                            userInfo && userInfo.all && 
                            userInfo.all.labels.includes("admin") && (<>
                                                    <button
                            onClick={() => {
                                navigate(`/learn/${courseInfo.$id}/new`)
                            }}
                          className=" text-sm font-bold border rounded-lg px-3 py-2 duration-150 bg-blue-400 hover:bg-blue-500 text-white"
                        >

                      Add New Lecture
                        </button>
                            </>)
                        }
                  </div>
                  <ul className="mt-12 divide-y sm:max-h-[16rem] md:max-h-[20rem]  lg:max-h-[28rem] overflow-y-auto">
                    {
                        members.length == 0 ? (<>
                        <li>No Lecture Available at the moment</li>
                        </>) : (<>
                            {members.map((item, idx) => (
                      <li
                        key={idx}
                        className="py-5 flex items-start justify-between"
                      >
                        <div className="flex gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${idx+1}&background=random`}
                            className="flex-none w-12 h-12 rounded-full"
                          />
                          <div>
                            <span className="block text-sm text-gray-700 font-semibold">
                              {item.title}
                            </span>
                            <span className="block text-sm text-gray-600">
                              {item.desc}
                            </span>
                          </div>
                        </div>
                        <button
                            onClick={() => {
                                setNowPlaying(item.rawURL);
                            }}
                          className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
                        >
                          Watch
                        </button>
                        {
                            userInfo && userInfo.all && 
                            userInfo.all.labels.includes("admin") && (<>
                                                    <button
                            onClick={() => {
                                navigate(`/learn/${courseInfo.$id}/${item.$id}/edit`)
                            }}
                          className=" text-sm border rounded-lg px-3 py-2 duration-150 bg-blue-400 hover:bg-blue-500 text-white"
                        >
                          Edit
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/learn/${courseInfo.$id}/${item.$id}/delete`)
                            }}
                          className=" text-sm border rounded-lg px-3 py-2 duration-150 bg-red-400 hover:bg-red-500 text-white"
                        >
                          Delete
                        </button>
                            </>)
                        }

                      </li>
                    ))}
                        </>)
                    }
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
            </>)
        }

    </DefaultLayout>
  );
}

export default LecturePage;
