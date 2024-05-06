// import { ExecutionMethod } from "appwrite";
// import { functions } from "../config";
import { env } from "@/env";
import axios from "axios";


export async function ExecuteCreateOrderApp(courseID){
    try{
        
const result = await axios.get(env.courseCreateOrder,{
    courseID

})
        return {
            status:200, 
            resp: await result
        }
    }catch(e){
        const message = e.message;
        return {
            status:400,
            resp:message
        }
    }

}