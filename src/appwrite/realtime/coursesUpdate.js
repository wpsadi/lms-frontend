import { client } from "@/appwrite/config";
import { env } from "@/env";
// import { getAllCourses } from "@/Redux/slices/courseSlice";

export class CoursesUpdate {
    constructor(dispatch) {
        this.env = env;
        this.dispatch = dispatch;
    }

    async subscribe() {
        //client.subscribe([`databases.${this.env.CoreDatabaseId}.collections.${this.env.CourseCollectionId}.documents.*.update`], response => {
            await client.subscribe(`databases.*.collections.*.documents.*.update`, (resp) => {    
        // Callback will be executed on changes for documents A and all files.
            // console.log(resp);
            // this.dispatch(getAllCourses())
            // console.log(response);
            return resp
        });
    }

    
    async unsubscribe() {
        this.client.subscribe();
    }
}
