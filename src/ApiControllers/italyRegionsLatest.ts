import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });

async function italyRegionsLatest() {
  try {
    let call = await fetch(process.env.ITALY_REGIONS_LATEST!);
    let result = await call.json();
    return result;
  } catch (error) {
    console.log("Error in ItalyRegionsLatest ApiControllers")
    return;
  }
}

export { italyRegionsLatest };
