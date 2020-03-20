import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });

export async function radarChart(data: any){
  try {
    let call: Response = await fetch(process.env.CHAT_URL_DEV!, {
      method: "POST",
      body: data
    });

    let result: any = await call;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error
  }
}