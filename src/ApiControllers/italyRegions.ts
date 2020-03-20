import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });

async function italyRegions(){
  try {
    let call = await fetch(process.env.ITALY_REGIONS!);
    let result = await call.json();
  } catch (error) {
    console.log(error);
    return
  }
}

export {italyRegions};