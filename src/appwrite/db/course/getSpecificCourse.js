import { ViewFileCourseBucketApp } from "@/appwrite/bucket/courses/GetView";
import { dbs } from "@/appwrite/config";
import { env } from "@/env";


export async function GetSpecificCourses(SearchCourseID) {
    try {
        const response = await dbs.getDocument(env.CoreDatabaseId, env.CourseCollectionId,SearchCourseID);

        const newRes = await (async ()=>{
            const fileID = response.thumbnail;
            if ((fileID.length!== 0) || (fileID !== null)){
                const urlObj = await ViewFileCourseBucketApp(fileID);
                const url = urlObj.resp.href
                return {
                    ...response,
                    thumbnail:url
                }
            }
            else{
                return response
            }
            


        })()
        return {
            status: 200,
            resp: newRes
        }
    } catch (e) {
        const message = e.message;
        return {
            status: 400,
            resp: message
        }
    }
}   