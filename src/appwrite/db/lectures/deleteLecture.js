import { env } from "@/env";
import axios from "axios";

export async function DeleteLecturesApp(lectureID) {
  try {
    const response = await axios.post(env.lectureDeleteURL,{
        fileID:lectureID
    })
    

    return {
      status: response.status,
      resp: response.data,
    };
  } catch (e) {
    const message = e.message;
    return {
      status: 400,
      resp: message,
    };
  }
}
