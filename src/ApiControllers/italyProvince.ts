import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });

async function italyProvince(): Promise<Object> {
  try {
    let call: Response = await fetch(process.env.ITALY_PROVINCE!);
    let result: Object = await call.json();
    return result;
  } catch (error) {
    console.log("Error in ItalyProvince ApiControllers")
    return error;
  }
}

export { italyProvince };
