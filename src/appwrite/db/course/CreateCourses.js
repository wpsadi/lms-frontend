import { uploadToCoursesBucketApp } from "@/appwrite/bucket/courses/uploadToCoursesBucket";
import { account, dbs,ID } from "@/appwrite/config";
import { env } from "@/env";


// please ensure tha category is a string
export async function CreateNewCourse({
    title,
    desc,
    category,
    price,
    thumbnail,
    currency,
    
}) {

    const data = {
        title,
        desc,
        category:(JSON.parse(category)).map((item)=>item.value),
        price:Number(price).toFixed(2),
        currency,
        createdBy:(await account.get())["$id"],
        
    }

    
    const priceRegex = /^\d+(\.\d{1,2})?$/gi;

    try {    
        if (priceRegex.test(price) === false) {
        throw new Error("Invalid price")
    }


        const newDocID  = ID.unique();
        let response = await dbs.createDocument(env.CoreDatabaseId, env.CourseCollectionId,newDocID,data);

        if (thumbnail.size >0){
            const upload = await uploadToCoursesBucketApp(thumbnail)
            if (upload.status === 200){
                response = await dbs.updateDocument(env.CoreDatabaseId, env.CourseCollectionId,response["$id"],{
                    thumbnail:upload.resp["$id"]
                })


            }

            else{
                throw new Error("Error uploading thumbnail")
            }

        }
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