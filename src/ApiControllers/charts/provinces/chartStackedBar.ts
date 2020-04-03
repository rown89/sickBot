import fetch, { Response } from "node-fetch";
import { config } from "dotenv";

config({ path: "../../../.env" });
//const { CHART_PROD_URL, CHART_DEV_URL } = process.env;

async function chartProvinceStackedBar(province) {
  try {
    let call: Response = await fetch(
      process.env.NODE_ENV === "production"
        ? new URL("http://euve264410.serverprofi24.net:4200/buildChart/province/stackedBar")
        : new URL("http://localhost:4200/buildChart/province/stackedBar"),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(province),
      }
    );
    let result: any = await call;
    return result;
  } catch (error) {
    console.log("Error in Chart ApiControllers province stackedBar\n", error);
    return error;
  }
}

export { chartProvinceStackedBar };