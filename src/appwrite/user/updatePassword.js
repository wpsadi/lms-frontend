import {account} from "@/appwrite/config.js";


export async function UpdateUserPasswordApp(
    oldPassword,newPassword
){
    try{
        //(email,password)
        const response = await account.updatePassword(newPassword,oldPassword);
        // //(user)
        return {
            status:200,
            resp:response
        }
    }catch(e){
        const message = e.message;
        return {
            status:400,
            resp:message
        }
    }

}