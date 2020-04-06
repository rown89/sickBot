import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });

async function italy(): Promise<Object> {
  try {
    let call: Response = await fetch(process.env.ITALY!);
    let result: Object = await call.json();
    return result;
  } catch (error) {
    console.log("Error in Italy ApiControllers")
    return error
  }
}

export {italy};