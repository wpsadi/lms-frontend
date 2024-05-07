import {account, dbs, Query} from "@/appwrite/config";
import {env} from "@/env";


export async function GetAllUserPurchases() {
    try {
        const toSelect = ["order_id","payment","courses"];

        const userID = (await account.get())["$id"]
        // console.log(userID)
const response = await dbs.listDocuments(env.CoreDatabaseId, env.paymentsCollectionId,[Query.equal("userID", [userID])])

        const result = (()=>{
            const res = new Array();
            (response.documents).map((doc)=>{
               
                res.push( {
                    order_id:doc["order_id"],
                    payment:doc["payment"],
                    courses:{
                        title:doc["courses"].title,
                        id:doc["courses"].$id
                    }
                })
            })
            return res
        }
        )()

        console.log(result)
        return {
            status: 200,

            
            resp: {
                parameters : toSelect,
                total:response.total,
                documents: result
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