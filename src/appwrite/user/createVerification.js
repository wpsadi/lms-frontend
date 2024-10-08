import {account} from "@/appwrite/config.js";
import { env } from "@/env.js";


export const resendVerification = async () => {
    try {
        const response = await account.createVerification(env.emailVerificationURL);
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