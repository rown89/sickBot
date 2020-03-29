import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });

async function italyProvinceLatest() {
  try {
    let call: Response = await fetch(process.env.ITALY_PROVINCE_LATEST!);
    let result: Object = await call.json();
    return result;
  } catch (error) {
    console.log("Error in ItalyProvinceLatest ApiControllers")
    return error;
  }
}

export { italyProvinceLatest };
