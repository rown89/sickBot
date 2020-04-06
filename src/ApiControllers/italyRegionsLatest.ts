import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });

async function italyRegionsLatest(): Promise<Object> {
  try {
    let call: Response = await fetch(process.env.ITALY_REGIONS_LATEST!);
    let result: Object = await call.json();
    return result;
  } catch (error) {
    console.log("Error in ItalyRegionsLatest ApiControllers")
    return error;
  }
}

export { italyRegionsLatest };
