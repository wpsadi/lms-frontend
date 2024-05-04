import {account} from "@/appwrite/config.js";
import { env } from "@/env.js";


export const createRecoverPasswordApp = async (email) => {
    try {
        const response = await account.createRecovery(email,env.PasswordRecoverUser);
        //(response)   
        return {
            status: 200,
            resp: response
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