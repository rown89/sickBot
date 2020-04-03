const fs = require("fs");
import { Message, MessageAttachment } from "discord.js";
import { italyProvince, chartRadar } from "../../../src/ApiControllers"
import { ItalianRegion } from "../../interfaces";

const covidChartRegionRadar = async (message: Message) => {
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
      const stackedBar = await chartRadar({region1, region2});
      const buffer = fs.readFileSync('./backend/charts/generatedImages/pcRadar.png');
       stackedBar.ok == true 
        ? message.reply(`${message.author},`, new MessageAttachment(buffer))
        : message.reply("Sry, i cant retrieve the image"); 
    } catch(err) {
      console.log(err)
    };
  };

  try {
    const result: Array<ItalianRegion> = await italyProvince();
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
