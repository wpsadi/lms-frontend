import { dbs,ID ,account, locale} from "@/appwrite/config";
import { env } from "@/env";


export async function CreateQueryApp({
    email,query
}) {
    try {
        const response = await dbs.createDocument(env.CoreDatabaseId, env.HelpddeskCollectionId,ID.unique(),{
            email:email,
            query:query,
            raisedBy : (await account.get()).$id,
            status:"pending",
            createdAt: new Date().toISOString(),
            ...await locale.get()
        });
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