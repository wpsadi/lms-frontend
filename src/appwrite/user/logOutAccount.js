import {account} from "@/appwrite/config.js";


export async function LogOutUserApp(){
    try{
        await account.deleteSession("current");
        return {
            status:200,
            resp:"done"
        
        }
        // console.log(user
    }
    catch(e){
        const message = e.message;
        return {
            status:400,
            resp:message
        }
    }
}