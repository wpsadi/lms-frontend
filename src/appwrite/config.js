import { Client, Account, ID, Databases, Locale,Query } from "appwrite";
import { env } from "@/env";

export const client = new Client();

export const account = new Account(client);

export const dbs = new Databases(client);

export const locale = new Locale(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(env.projectId); // Your project ID



export {ID,Query}