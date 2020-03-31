import { Message, MessageEmbed } from "discord.js";

const helpCommand = (message: Message) => {
  const help = new MessageEmbed()
    .setTitle("SickBot Commands:")
    .setColor(0xf8e71c)
    .setDescription(
      `
      !!covid - return last data about Italy.
      \n!!covid r name / return last data about an Italian region.
      \n!!covid p name / return last data about italian Province.
      \n!!covid r 2020-03-01 - 2020-03-20 region / return a region chart between two dates
      `
    );
  message.channel.send(help);

  return help
};

export { helpCommand };