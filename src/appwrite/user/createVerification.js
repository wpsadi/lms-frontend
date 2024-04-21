import {account} from "@/appwrite/config.js";
import { env } from "@/env.js";


export const resendVerification = async () => {
    try {
        const response = await account.createVerification(env.emailVerificationURL);
        console.log(response)   
        return {
            status: 200,
            resp: response
        }
    } catch (e) {
        const message = e.message;
        console.log(message)
        return {
            status: 400,
            resp: message
        }
    }
}