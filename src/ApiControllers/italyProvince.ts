import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });

async function italyProvince() {
  try {
    let call = await fetch(process.env.ITALY_PROVINCE!);
    let result = await call.json();
    return result;
  } catch (error) {
    console.log("Error in ItalyProvince ApiControllers")
    return error;
  }
}

export { italyProvince };
