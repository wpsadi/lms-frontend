import { Client, Account, ID } from "appwrite";
import { env } from "@/env";

const client = new Client();

const account = new Account(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(env.projectId); // Your project ID



export {account,client,ID}