import { Message, MessageAttachment } from "discord.js";
import { italyRegions, chartStackedBar } from "../../../src/ApiControllers"
import { ItalianRegion } from "../../interfaces";

const covidChartRegionStackedBar = async (message: Message) => {
  const requiredRegion = () => {
    if (
      message.content.substring(40).toLowerCase() === "emilia romagna" ||
      message.content.substring(40).toLowerCase() === "Emilia romagna" ||
      message.content.substring(40).toLowerCase() === "Emilia Romagna" ||
      message.content.substring(40).toLowerCase() === "emilia Romagna"
    ) {
      return "emilia-romagna";
    } else return message.content.substring(40).toLowerCase();
  }
  const fromDate = message.content.substring(16, 26).toLowerCase();
  const toDate = message.content.substring(29, 39).toLowerCase();
  const sendData = async (regionsFromDate, regionsToDate) => {
    const region1 = regionsFromDate.filter(item => item.denominazione_regione.toLowerCase() === requiredRegion())[0];
    const region2 =  regionsToDate.filter(item => item.denominazione_regione.toLowerCase() === requiredRegion())[0];
    const regions = () => { return { region1, region2 } };
    try {
      const radar = await chartStackedBar(regions());
      if(radar.ok){
        console.log("radar " + radar.ok);
        const attachment = new MessageAttachment("./backend/charts/generatedImages/stackedBar.png");
        message.reply(attachment);
      } else return message.reply("Sry, i cant retrieve the image");
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
