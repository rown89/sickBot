import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });
const { CHART_PROD_URL, CHART_DEV_URL } = process.env;

async function chartRadar(regions) {
  try {
    let call: Response = await fetch(
      process.env.NODE_ENV === "production"
        ? new URL("http://62.75.141.240:4000/buildChart/region/radar")
        : new URL("http://localhost:4000/buildChart/region/radar"),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(regions)
      }
    );

    let result: any = await call;
    return result;
  } catch (error) {
    console.log("Error in Chart ApiControllers\n", error);
    return error;
  }
}

export { chartRadar };