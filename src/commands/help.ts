import { Message, MessageEmbed } from "discord.js";

const helpCommand = (message: Message) => {
  const help = new MessageEmbed()
    .setTitle("SickBot Commands:")
    .setColor(0xf8e71c)
    .setDescription(
      `
      !!covid - return last data about Italy.
      \n!!covid r <region> | Last data about an Italian region.
      \n!!covid p <province> | return last data about italian Province.
      \n!!covid rc sbars 2020-03-01 - 2020-03-20 <region> | Build Stacked bars Chart between two dates
      \n!!covid rc radar 2020-03-01 - 2020-03-20 <region> | Build Radar Chart between two dates
      `
    );
  message.channel.send(help);

  return help
};

export { helpCommand };