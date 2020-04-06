import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });

async function chartRadar(regions: object): Promise<Object> {
  try {
    let call: Response = await fetch(
      process.env.NODE_ENV === "production"
        ? new URL(process.env.CHART_PROD_REGION_RADAR_URL!)
        : new URL(process.env.CHART_DEV_REGION_RADAR_URL!),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(regions)
      }
    );
    let result = await call;
    return result;
  } catch (error) {
    console.log("Error in Chart ApiControllers\n", error);
    return error;
  }
}

export { chartRadar };