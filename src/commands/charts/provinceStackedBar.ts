import { Message, MessageAttachment } from "discord.js";
import { italyProvince, chartProvinceStackedBar } from "../../ApiControllers"
import { ItalianProvince } from "../../interfaces";

const covidChartProvinceStackedBar = async (message: Message): Promise<void> => {
  const requiredProvince = message.content.substring(41).toLowerCase();
  const fromDate = message.content.substring(17, 27).toLowerCase();
  const toDate = message.content.substring(30, 40).toLowerCase();
  
  const sendData = async (province1: object, province2: object) => {
    try {
      const stackedBar = await chartProvinceStackedBar({province1, province2});
      const {imagePath} = await stackedBar.json();
      const path = "./backend" + imagePath[0].substring(1);

      path.length > 10
        ? message.reply(new MessageAttachment(path))
        : message.reply("Sry, i cant retrieve the image"); 
    } catch(err) {
      console.log(err)
    };
  };

  try {
    const result: Array<ItalianProvince> = await italyProvince();
    const checkFromData = result.filter(item => item.data.substring(0, 10)  === fromDate);
    const checkToDate = result.filter(item => item.data.substring(0, 10) === toDate);
    const province1 = checkFromData.filter(item => item.denominazione_provincia.toLowerCase() === requiredProvince)[0];
    const province2 =  checkToDate.filter(item => item.denominazione_provincia.toLowerCase() === requiredProvince)[0];
    sendData(province1, province2);
  } catch (err) {
    console.log("Err in italyRegions API", err)
  };
};

export { covidChartProvinceStackedBar };
