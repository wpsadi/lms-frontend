import { dbs } from "@/appwrite/config";
import { env } from "@/env";
export async function EditLecturesApp(lectureID,{
    title,
    desc
}) {
  try {
    const existingData = await dbs.getDocument(
        env.CoreDatabaseId,
        env.FilesCollectionId,
        lectureID
    )
    const response = await dbs.updateDocument(
        env.CoreDatabaseId,
        env.FilesCollectionId,
        lectureID,
        {

            title,
            desc,
            id:existingData.id,
            name:existingData.name,
            path_lower:existingData.path_lower,
            path_display:existingData.path_display,
            size:existingData.size,
            rev:existingData.rev,
            is_downloadable: existingData.is_downloadable,
            content_hash:existingData.content_hash,
            shareURL:existingData.shareURL,
            courses:existingData.courses,
            lecture_number : existingData.lecture_number,
            rawURL:existingData.rawURL,
            courseID:existingData.courseID


        }
    )
    

    return {
      status: 200,
      resp: response,
    };
  } catch (e) {
    const message = e.message;
    return {
      status: 400,
      resp: message,
    };
  }
}
