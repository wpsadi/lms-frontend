import {account} from "@/appwrite/config.js";


export const resetPasswordApp = async (secret,userId,password) => {
    try {
        const response = await account.updateRecovery(userId,secret,password);
        return {
            status: 200,
            resp: response
        }
    } catch (e) {
        const message = e.message;
        return {
            status: 400,
            resp: message
        }
    }
}