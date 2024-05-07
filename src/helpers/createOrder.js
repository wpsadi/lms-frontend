
import { account } from "@/appwrite/config";
import { env } from "@/env.js";
import axios from "axios"


export const createOrder = async (courseID) => {
    try {
        const response = await axios.post(
            env.courseCreateOrder,
            {
                userID: (await account.get()).$id,
              courseID: courseID,
              callbackURL:env.callbackURL
            }
          );
        //(response)   
        return {
            status: 200,
            resp: response.data
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