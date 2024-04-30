import { account, dbs,ID } from "@/appwrite/config";
import { env } from "@/env";



// please ensure tha category is a string
export async function CreateNewCourse({
    title,
    desc,
    category,
    price,
    currency,
    
}) {

    const data = {
        title,
        desc,
        category:(JSON.parse(category)).map((item)=>item.value),
        price,
        currency,
        createdBy:(await account.get())["$id"],
        
    }
    const priceRegex = /^\d+(\.\d{1,2})?$/gi;

    try {    
        if (priceRegex.test(price) === false) {
        throw new Error("Invalid price")
    }
    console.log(data.category)
        const response = await dbs.createDocument(env.CoreDatabaseId, env.CourseCollectionId,ID.unique(),data);
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