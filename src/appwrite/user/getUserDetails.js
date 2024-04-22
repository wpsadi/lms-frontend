import {account} from "@/appwrite/config.js"

export async function SetUpUser(){
    try{
        const user = await account.get();
        // //(user)
        return {
            status:200,
            resp:user
        }
    }catch(e){
        const message = e.message;
        return {
            status:400,
            resp:message
        }
    }
}