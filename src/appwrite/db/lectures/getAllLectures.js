import { dbs, Query} from "@/appwrite/config.js"
import { env } from "@/env";

export async function getCourseLectures(courseID){
    try{
        const user = await dbs.listDocuments(
            env.CoreDatabaseId,
            env.FilesCollectionId,
            [Query.equal("courseID",courseID)]
        );
        // //(user)
        return {
            status:200,
            resp:user
        }
    }catch(e){
        const message = e.message;
        return {
            status:400,
            resp:message
        }
    }
}