import { dbs } from "@/appwrite/config";
import { env } from "@/env";

export async function GetAllCoursesApp() {
    try {
        const response = await dbs.listDocuments(env.CoreDatabaseId, env.CourseCollectionId);
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