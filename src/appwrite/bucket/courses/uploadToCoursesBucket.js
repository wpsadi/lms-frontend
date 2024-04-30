import {  account, fileManager, ID } from "@/appwrite/config";
import { env } from "@/env";

export async function uploadToCoursesBucketApp(file) {
    try {
        const userData = await account.get();
        let response = await fileManager.createFile(
            env.CoursesBucketId, // bucketId
            ID.unique(), // fileId
            file, // file
        );
        response = await fileManager.updateFile( env.CoursesBucketId,response["$id"],`${userData["$id"]}_${Date.now()}_${file.name}`)


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