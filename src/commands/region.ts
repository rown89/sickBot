import { Message } from "discord.js";
import { covidMessage } from "../embeddedMessages";
import { italyRegionsLatest } from "../ApiControllers";
import { ItalianRegionLatests } from "../interfaces";

const covidRegionCommand = async (message: Message) => {
  const requiredRegion = message.content.substring(10).toLowerCase();

  const covidRegion = message
    .reply(` retrieving ${requiredRegion.toUpperCase()}  Region data`)
    .then(sentMessage => sentMessage.delete({ timeout: 2000 }));
  try {
    const result: Array<ItalianRegionLatests> = await italyRegionsLatest();
    const printResult: any = result.filter(item => {
      return item.denominazione_regione.toLowerCase() === requiredRegion;
    });
    printResult
      ? message.channel.send({
          embed: covidMessage(
            `${requiredRegion.toUpperCase()} (Region) :`,
            0xf8e71c,
            printResult[0]
          )
        })
      : message.reply(requiredRegion + " doesn't exist as a region");
  } catch (error) {
    message.reply(
      `Some error occurred during API call or ${requiredRegion} doesn't exist as a Region`
    );
  }

  return covidRegion;
};

export { covidRegionCommand };
