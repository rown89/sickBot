import { Message, MessageAttachment } from "discord.js";
import { italyRegions, chartRadar } from "../../../src/ApiControllers"
import { ItalianRegion } from "../../interfaces";

const covidChartRegionRadar = async (message: Message): Promise<void> => {
  const requiredRegion = () => {
    const region = message.content.substring(41).toLowerCase();
    if (region === "emilia romagna" || region === "Emilia romagna" || region === "Emilia Romagna" || region === "emilia Romagna"){
      return "emilia-romagna";
    } else return region;
  };

  const fromDate = message.content.substring(17, 27).toLowerCase();
  const toDate = message.content.substring(30, 40).toLowerCase();
  
  const sendData = async (region1, region2) => {
    try {
      const radar = await chartRadar({region1, region2});
      const {imagePath} = await radar.json();
      let path = "./backend" + imagePath[0].substring(1);

      path.length > 10
      ? message.reply(new MessageAttachment(path))
      : message.reply("Sry, i cant retrieve the image"); 
    
    } catch(err) {
      console.log(err)
    };
  };

  try {
    const result: Array<ItalianRegion> = await italyRegions();
    const checkFromData = result.filter(item => item.data.substring(0, 10)  === fromDate);
    const checkToDate = result.filter(item => item.data.substring(0, 10) === toDate);
    const region1 = checkFromData.filter(item => item.denominazione_regione.toLowerCase() === requiredRegion())[0];
    const region2 =  checkToDate.filter(item => item.denominazione_regione.toLowerCase() === requiredRegion())[0];
    sendData(region1, region2);
  } catch (err) {
    console.log("Err in italyRegions API", err)
  };
};

export { covidChartRegionRadar };
