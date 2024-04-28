import { dbs,ID ,account, locale} from "@/appwrite/config";
import { env } from "@/env";


export async function CreateQueryApp({
    query
}) {
    try {
        const user = (await account.get())
        const response = await dbs.createDocument(env.CoreDatabaseId, env.HelpddeskCollectionId,ID.unique(),{
            email:user.email,
            query:query,
            raisedBy : user.$id,
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