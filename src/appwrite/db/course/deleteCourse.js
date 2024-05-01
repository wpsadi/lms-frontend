import { deleteFromCoursesBucketApp } from "@/appwrite/bucket/courses/deleteFromCourseBucket";
import {  dbs} from "@/appwrite/config";
import { env } from "@/env";


// please ensure tha category is a string
export async function  DeleteCourseApp(id) {



    try {    
        

        const course = await dbs.getDocument(env.CoreDatabaseId, env.CourseCollectionId,id);
        const thumbnail = course.thumbnail;
        if (course.thumbnail !== null && course.thumbnail.length > 0){
            await deleteFromCoursesBucketApp(thumbnail)
        }
        const response = await dbs.deleteDocument(env.CoreDatabaseId, env.CourseCollectionId,id);


        // const response = ""
        return {
            status: 200,
            resp: response
        }
    } catch (e) {
        const message = e.message;
        return {
            status: 400,
            resp: message
        }
    }
}   