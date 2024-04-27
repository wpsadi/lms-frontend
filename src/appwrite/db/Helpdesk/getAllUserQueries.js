import {account, dbs, Query} from "@/appwrite/config";
import {env} from "@/env";


export async function GetAllUserQueriesApp() {
    try {
        const toSelect = ["$id","email","status","raisedBy","$createdAt","continent","country","responded","eu","response","query"];

        const userID = (await account.get())["$id"]
        // console.log(userID)
const response = await dbs.listDocuments(env.CoreDatabaseId, env.HelpddeskCollectionId,[Query.select(toSelect),Query.equal("raisedBy", [userID])])

        return {
            status: 200,
            
            resp: {
                parameters : toSelect,
                ...response,
            }
        }
    } catch (e) {
        const message = e.message;
        return {
            status: 400,
            resp: message
        }
    }
}   