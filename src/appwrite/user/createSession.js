import {account} from "@/appwrite/config.js";
import { SetUpUser } from "./getUserDetails";


export async function LoginUserApp({
    email,password
}){
    try{
        console.log(email,password)
        await account.createEmailPasswordSession(email,password);
        // console.log(user)
        return {
            status:200,
            resp:await SetUpUser()
        }
    }catch(e){
        const message = e.message;
        return {
            status:400,
            resp:message
        }
    }

}