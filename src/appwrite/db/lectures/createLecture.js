import { env } from "@/env";
import axios from "axios";

export async function createLecturesApp({ courseID, title, desc, thumbnail}) {
  try {
    const formData = new FormData();
    formData.append('courseID', courseID);
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('file', thumbnail);
    // console.log(file_input)
    // Modify the file here if needed
    // For example, if you want to convert it to base64 string:
    // const base64File = await convertFileToBase64(file);
    // formData.append('file', base64File);

    const response = await axios.post(env.letureUploadURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    

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
