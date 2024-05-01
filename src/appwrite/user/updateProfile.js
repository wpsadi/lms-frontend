import {account} from "@/appwrite/config.js";


export async function UpdateUserProfileApp({
    firstname,lastname
}){
    try{
        const user = await account.get()
        const existingPrefs = user.prefs;
        const response = await account.updateName([
            firstname.toLowerCase().trim(),
            lastname.toLowerCase().trim(),
          ].join(" "));
          await account.updatePrefs({
            ...existingPrefs,
            firstname: firstname,
            lastname: lastname
          });


        // //(user)
        return {
            status:200,
            resp:response
        }
    }catch(e){
        const message = e.message;
        return {
            status:400,
            resp:message
        }
    }

}