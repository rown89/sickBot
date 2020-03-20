import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });

async function italyLatest() {
  try {
    let callItaly: Response = await fetch(process.env.ITALY_LATEST!);
    let result: Object = await callItaly.json();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { italyLatest };
