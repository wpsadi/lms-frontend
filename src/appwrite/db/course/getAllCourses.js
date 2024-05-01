import { ViewFileCourseBucketApp } from "@/appwrite/bucket/courses/GetView";
import { dbs, Query } from "@/appwrite/config";
import { env } from "@/env";

export async function GetAllCoursesApp() {
    try {
        const response = await dbs.listDocuments(env.CoreDatabaseId, env.CourseCollectionId,[Query.orderDesc('$createdAt')]);

        const NewResponse = new Array() 
        response.documents.forEach(async (course)=>{
            if ((course.thumbnail === null) || (course.thumbnail.length === 0 || course.thumbnail === undefined || course.thumbnail === "")){
                NewResponse.push(course)
            }
            else{
                try{
                    const viewURL = await ViewFileCourseBucketApp(course.thumbnail)
                    
                    NewResponse.push( {
                        ...course,
                        thumbnail:viewURL.resp.href
                    })

                }
                catch(e){
                    NewResponse.push( {
                        ...course,
                        thumbnail:null
                    })
                }
            }
        })
        return {
            status: 200,
            resp: {
              total:response.total,
              documents:NewResponse  
            }
        }
    } catch (e) {
        const message = e.message;
        return {
            status: 400,
            resp: message
        }
    }
}   