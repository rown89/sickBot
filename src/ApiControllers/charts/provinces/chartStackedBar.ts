import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });

async function chartProvinceStackedBar(province) {
  try {
    let call: Response = await fetch(
      process.env.NODE_ENV === "production"
        ? new URL(process.env.CHART_PROD_PROVINCE_STACKEDBAR_URL!)
        : new URL(process.env.CHART_DEV_PROVINCE_STACKEDBAR_URL!),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(province),
      }
    );
    let result = await call;
    return result;
  } catch (error) {
    console.log("Error in Chart ApiControllers province stackedBar\n", error);
    return error;
  }
}

export { chartProvinceStackedBar };