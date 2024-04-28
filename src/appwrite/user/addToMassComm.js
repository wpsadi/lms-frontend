import {msg} from "@/appwrite/config.js";
import {ID} from "appwrite"
import { env } from "@/env.js";


export const addToMassMail = async () => {
    try {
        const response = await msg.createSubscriber(
            env.MassCommMessagingTopicId, // topicId
            ID.unique(), // subscriberId
            ID.unique() // targetId
        );
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