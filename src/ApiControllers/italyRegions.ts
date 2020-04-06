import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });

async function italyRegions(): Promise<Object> {
  try {
    let call: Response = await fetch(process.env.ITALY_REGIONS!);
    let result: Object = await call.json();
    return result;
  } catch (error) {
    console.log("Error in ItalyRegions ApiControllers")
    return error;
  }
}

export { italyRegions };
