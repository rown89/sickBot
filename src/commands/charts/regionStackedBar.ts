import { Message, MessageAttachment } from "discord.js";
import { italyRegions, radarChart } from "../../../src/ApiControllers"
import { ItalianRegion } from "../../interfaces";

const fs = require('fs');

const covidChartRegionStackedBar = async (message: Message) => {
  const fromDate = message.content.substring(16, 26).toLowerCase();
  const toDate = message.content.substring(29, 39).toLowerCase();
  const requiredRegion = message.content.substring(40).toLowerCase();
  const sendData = async (regionsFromDate, regionsToDate) => {
    const region1 = regionsFromDate.filter(item => item.denominazione_regione.toLowerCase() === requiredRegion)[0];
    const region2 =  regionsToDate.filter(item => item.denominazione_regione.toLowerCase() === requiredRegion)[0];
    const regions = () => { return { region1, region2 } };
    try {
      const radar = await radarChart(regions());
      const buffer = fs.readFileSync('../backend/charts/generateImages/radar.png');
      const attachment = new MessageAttachment(buffer, "image.png");
      message.reply(attachment);
    } catch(err){ 
      console.log("error, " + err);
      return err
    }
  };

  try {
    const result: Array<ItalianRegion> = await italyRegions();
    const checkFromData = result.filter(item => item.data.substring(0, 10)  === fromDate);
    const checkToDate = result.filter(item => item.data.substring(0, 10) === toDate);
    sendData(checkFromData, checkToDate);
  } catch (error) {
    message.reply(`sorry, i can't build a shit right now.`);
  }
};

export { covidChartRegionStackedBar };
