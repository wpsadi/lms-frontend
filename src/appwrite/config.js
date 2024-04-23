import { Client, Account, ID, Databases } from "appwrite";
import { env } from "@/env";

const client = new Client();

const account = new Account(client);

const dbs = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(env.projectId); // Your project ID



export {account,client,ID,dbs}