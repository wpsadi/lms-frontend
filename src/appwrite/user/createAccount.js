import {account,ID} from "@/appwrite/config.js";
import { env } from "@/env";
import { addToMassMail } from "./addToMassComm";

export async function createUserApp({
  name,
  email,
  password,
  // phone,
  firstname,
  lastname,
}) {
  try {
    // //("hi")
    /*const data = {
      name,
      email,
      password,
      // phone,
      firstname,
      lastname,
    };*/

    //(data);
    const r1 = await account.create(ID.unique(), email, password, name);
    // //("bye")
     await account.createEmailPasswordSession(email, password);
    // await account.updatePhone(phone, password);
    await account.updatePrefs({
      firstname: firstname,
      lastname: lastname,
      raisedQuery:false
    });

    await addToMassMail(r1.targets.find((item)=>item.providerType === "email")["$id"]);

    await account.createVerification(env.emailVerificationURL);




    // // await account.
    // const account = await account.get();
    return {
      status: 200,
      resp: "done",
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
