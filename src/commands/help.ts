import { Message } from "discord.js";
import { covidHelp } from "../embeddedMessages";

const helpCommand = (message: Message): void => {
  const helpMsg = [
    "!!covid",
    "!!covid r <region>",
    "!!covid p <province>",
    "!!covid rc sbars 2020-03-01 - 2020-03-20 <region>",
    "!!covid rc radar 2020-03-01 - 2020-03-20 <region>",
    "!!covid pc sbars 2020-03-01 - 2020-03-20 <province>"
  ];

  message.channel.send({ embed: covidHelp("SickBot Help", 0xf8e71c, helpMsg) });
};

export { helpCommand };
