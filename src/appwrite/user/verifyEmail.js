import {account} from "@/appwrite/config.js"

export async function VerifyEmailApp({
    userId,secret
}){
    try{
        const user = await account.updateVerification(userId,secret);
        // console.log(user)
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