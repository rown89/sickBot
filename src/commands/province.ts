import { Message } from "discord.js";
import { covidProvince } from "../embeddedMessages";
import { italyProvinceLatest } from "../ApiControllers";
import { ItalianProvinceLatests } from "../interfaces";

const covidProvinceCommand = async (message: Message) => {
  const requiredProvince = message.content.substring(10).toLowerCase();

  const covidProvinceMsg = message
    .reply(" retrieving " + requiredProvince + " province data")
    .then(sentMessage => sentMessage.delete({ timeout: 2000 }));

  try {
    const result: Array<ItalianProvinceLatests> = await italyProvinceLatest();
    const printResult = result.filter(item => {
      return item.denominazione_provincia.toLowerCase() === requiredProvince;
    });
    printResult
      ? message.channel.send({
          embed: covidProvince(
            `${requiredProvince.toUpperCase()} (Province) :`,
            0xf8e71c,
            printResult[0]
          )
        })
      : message.reply(requiredProvince + " doesn't exist as a Province");
  } catch (error) {
    message.reply(
      `Some error occurred during API call or ${requiredProvince} doesn't exist as a Province`
    );
  }

  return covidProvinceMsg;
};

export { covidProvinceCommand };
