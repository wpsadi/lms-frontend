import { Client, Account, ID, Databases, Locale,Query, Messaging,Storage } from "appwrite";
import { env } from "@/env";

export const client = new Client();

export const account = new Account(client);

export const dbs = new Databases(client);

export const locale = new Locale(client);

export const msg  = new Messaging(client);

export const fileManager = new Storage(client);



client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(env.projectId); // Your project ID



export {ID,Query}