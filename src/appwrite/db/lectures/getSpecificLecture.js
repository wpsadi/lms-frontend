import { dbs} from "@/appwrite/config.js"
import { env } from "@/env";

export async function getSpecificLecture(LectureID){
    try{
        const user = await dbs.getDocument(
            env.CoreDatabaseId,
            env.FilesCollectionId,
            LectureID
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