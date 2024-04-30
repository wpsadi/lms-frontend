import { fileManager } from "@/appwrite/config";
import { env } from "@/env";

export async function ViewFileCourseBucketApp(fileID) {
    try {
        // console.log(fileID)
        let response = await fileManager.getFileView(
            env.CoursesBucketId, // bucketId
            fileID, // fileId
        );
        
        // console.log(response)
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