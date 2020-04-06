import { Message } from "discord.js";
import { covidMessage } from "../embeddedMessages";
import { italyLatest } from "../../src/ApiControllers";
import { ItalianLatests } from "../../src/interfaces";

const covidCommand = async (message: Message): Promise<Message> => {
  const covid = message
    .reply(" retrieving Italian stats...")
    .then(sentMessage => sentMessage.delete({ timeout: 2000 }));
  try {
    const result: Array<ItalianLatests> | any = await italyLatest();
    message.channel.send({
      embed: covidMessage("Italy data :", 0xf8e71c, result[0])
    });
  } catch (error) {
    message.reply("Some error occurred during the API call on Italy. " + error);
  }

  return covid;
};

export { covidCommand };