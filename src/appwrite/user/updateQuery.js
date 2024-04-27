import {account} from "@/appwrite/config.js";

// eslint-disable-next-line no-unused-vars
export async function UpdateUserQueryApp(queryStatus =  false) {
  try {
    const existing = (await account.get()).prefs;
    const resp = await account.updatePrefs({
        ...existing,
      raisedQuery: existing.raisedQuery ? false : true,
    });
    
    return {
      status: 200,
      resp: resp,
    };
  } catch (e) {
    const message = e.message;
    return {
      status: 400,
      resp: message,
    };
  }
}

// //(
//   await createUserApp({
//     name: "tests",
//     email: "john.c.calhoun@efefexampeefefefeflpetoutdde.com",
//     password: "12345678",
//     phone: "+91123456880",
//     firstname: "w",
//     lastname: "w",
//   })
// );
