import { dbs, Query} from "@/appwrite/config";
import {env} from "@/env";


export async function GetSpecificQueriesApp(queryID) {
    try {
        const toSelect = ["$id","email","status","raisedBy","$createdAt","continent","country","responded","eu","response","query"];

        // const userID = (await account.get())["$id"];
        console.log(queryID);
        const response = await dbs.getDocument(env.CoreDatabaseId, env.HelpddeskCollectionId, queryID, [Query.select(toSelect)]);
        
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