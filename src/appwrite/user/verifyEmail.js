import {account} from "@/appwrite/config.js"
// import { createAsyncThunk } from "@reduxjs/toolkit";

export const VerifyEmailApp = async ({userId,secret}) => {
    try {
        //(userId,secret);
        const user = await account.updateVerification(userId,secret);
        console.log(user)

        return {
            status:200,
            resp:user
        };
    } catch(error) {
        return {
            status:400,
            resp:error.message
                }
    }
}

// export async function VerifyEmailApp({
//     userId,secret
// }){
//     try{
        
//         // //(user)
//         return {
//             status:200,
//             resp:user
//         }
//     }catch(e){
//         const message = e.message;
//         return {
//             status:400,
//             resp:message
//         }
//     }
// }