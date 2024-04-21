import {account,ID} from "@/appwrite/config.js";
import { env } from "@/env";

export async function createUserApp({
  name,
  email,
  password,
  phone,
  firstname,
  lastname,
}) {
  try {
    // console.log("hi")
    const data = {
      name,
      email,
      password,
      phone,
      firstname,
      lastname,
    };

    console.log(data);
    await account.create(ID.unique(), email, password, name);
    // console.log("bye")
     await account.createEmailPasswordSession(email, password);
    await account.updatePhone(phone, password);
    await account.updatePrefs({
      firstname: firstname,
      lastname: lastname,
    });

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

// console.log(
//   await createUserApp({
//     name: "tests",
//     email: "john.c.calhoun@efefexampeefefefeflpetoutdde.com",
//     password: "12345678",
//     phone: "+91123456880",
//     firstname: "w",
//     lastname: "w",
//   })
// );
