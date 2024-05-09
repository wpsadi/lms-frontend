
import { account, dbs, Query } from "@/appwrite/config";
import { env } from "@/env.js";
import axios from "axios"


export const createOrder = async (courseID,setHidePurchase) => {
    try {
        // const toSelect = ["order_id","payment","courses"];

        const userID = (await account.get())["$id"]
        // console.log(userID)
const respons = await dbs.listDocuments(env.CoreDatabaseId, env.paymentsCollectionId,[Query.equal("userID", [userID])])

        const result = (()=>{
            const res = new Array();
            (respons.documents).map((doc)=>{
               if (doc.payment == "done"){
                res.push( doc["courses"].$id)
               }
                
            })
            return res
        }
        )()

        if (result.includes(courseID)){
            setHidePurchase(true)
            throw new Error("Already Purchased")
        }


        const response = await axios.post(
            env.courseCreateOrder,
            {
                userID: (await account.get()).$id,
              courseID: courseID,
              callbackURL:env.callbackURL
            }
          );
        //(response)   
        return {
            status: 200,
            resp: response.data
        }
    } catch (e) {
        const message = e.message;
        //(message)
        return {
            status: 400,
            resp: message
        }
    }
}