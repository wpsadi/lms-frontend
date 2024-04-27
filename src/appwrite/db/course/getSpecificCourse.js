import { dbs } from "@/appwrite/config";
import { env } from "@/env";


export async function GetSpecificCourses(SearchCourseID) {
    try {
        const response = await dbs.getDocument(env.CoreDatabaseId, env.CourseCollectionId,SearchCourseID);
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