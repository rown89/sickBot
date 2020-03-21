import "@babel/register";
import { Message } from "discord.js";
import { config } from "dotenv";
import { SickBotClient } from "./src/SickBotClient";
import { color } from "./src/utilities/color";
import {
  italyLatest,
  italyProvince,
  italyProvinceLatest,
  italyRegions,
  italyRegionsLatest,
  radarChart
} from "./src/ApiControllers";

import {
  ItalianLatests,
  ItalianRegionLatests,
  ItalianProvinceLatests
} from "./src/interfaces";

config({ path: "./.env" });
const client: SickBotClient = new SickBotClient(process.env.BOT_TOKEN);
const PREFIX: string = "!!";

client.on("ready", (): void => {
  console.log("Hello, I'm sick but ready!");

  if (client.user) {
    client.user.setPresence({
      status: "online",
      activity: {
        name: "COVID-19",
        type: "WATCHING"
      }
    });
  }

  client.on(
    "message",
    async (message: Message): Promise<void> => {
      if (!message.content.startsWith(PREFIX)) return;
      if (message.author.bot) return;

      const args: Array<string> = message.content
        .slice(PREFIX.length)
        .trim()
        .split(" +/g");

      const cmd: string = args.shift()!.toLocaleLowerCase();

      if (cmd === "help") {
        const help = `!!covid - return last data about Italy.
          \n!!covid r name - return last data about an Italian region.
          \n!!covid p name - return last data about italian Province.`;
        message.channel.send("```" + `${help}` + "```");
      }

      if (cmd === "covid") {
        message.reply(" retrieving Italian stats...")
          .then(sentMessage => sentMessage.delete({timeout: 2000}))
        
        try {
          const result: Array<ItalianLatests> = await italyLatest();
          result.map(item => {
            return message.channel.send(
              `${"```>>> Italy Data\n\n" +
                "Totale casi: " +
                item.totale_casi +
                "\n" +
                "Totale attualmente positivi: " +
                item.totale_attualmente_positivi +
                "\n" +
                "Nuovi attualmente positivi: " +
                item.nuovi_attualmente_positivi +
                "\n" +
                "Terapia intensiva: " +
                item.terapia_intensiva +
                "\n" +
                "Ricoverati con sintomi:" +
                item.ricoverati_con_sintomi +
                "\n" +
                "Totale ospedalizzati: " +
                item.totale_ospedalizzati +
                "\n" +
                "Isolamento domiciliare: " +
                item.isolamento_domiciliare +
                "\n" +
                "Dimessi guariti: " +
                item.dimessi_guariti +
                "\n" +
                "Tamponi: " +
                item.tamponi +
                "\n" +
                "Deceduti: " +
                item.deceduti +
                "\n\nlast update: " +
                item.data +
                "```"}`
            );
          });
        } catch (error) {
          message.reply(
            "Some error occurred during the API call on italyLatest. " + error
          );
        }
      }

      if (message.content.includes(PREFIX + "covid r ")) {
        const requiredRegion = message.content.substring(10).toLowerCase();
        message.reply(" retrieving " + requiredRegion + " Region data")
          .then(sentMessage => sentMessage.delete({timeout: 2000}));
        let printResult: any = undefined;

        try {
          const result: Array<ItalianRegionLatests> = await italyRegionsLatest();
          result.filter(item => {
            if (item.denominazione_regione.toLowerCase() === requiredRegion) {
              return (printResult = item);
            }
          });

          printResult
            ? message.reply(`
              ${"```>>> " +
                requiredRegion +
                " Region Data" +
                "\n\n" +
                "Totale casi: " +
                printResult.totale_casi +
                "\n" +
                "Totale attualmente positivi: " +
                printResult.totale_attualmente_positivi +
                "\n" +
                "Nuovi attualmente positivi: " +
                printResult.nuovi_attualmente_positivi +
                "\n" +
                "Terapia intensiva: " +
                printResult.terapia_intensiva +
                "\n" +
                "Ricoverati con sintomi: " +
                printResult.ricoverati_con_sintomi +
                "\n" +
                "Totale ospedalizzati: " +
                printResult.totale_ospedalizzati +
                "\n" +
                "Isolamento domiciliare: " +
                printResult.isolamento_domiciliare +
                "\n" +
                "Dimessi guariti: " +
                printResult.dimessi_guariti +
                "\n" +
                "Tamponi: " +
                printResult.tamponi +
                "\n" +
                "Deceduti: " +
                printResult.deceduti +
                "\n\nlast update: " +
                printResult.data +
                "```"}`)
            : message.reply(requiredRegion + " doesn't exist as a region");
        } catch (error) {
          message.reply(
            "Some error occurred during the API call on Region. " + error
          );
        }
      }

      if (message.content.includes(PREFIX + "covid p ")) {
        const requiredProvince = message.content.substring(10).toLowerCase();
        message.reply(" retrieving " + requiredProvince + " province data")
          .then(sentMessage => sentMessage.delete({timeout: 2000}));
        let printResult: any = undefined;

        try {
          const result: Array<ItalianProvinceLatests> = await italyProvinceLatest();
          result.filter(item => {
            if (
              item.denominazione_provincia.toLowerCase() === requiredProvince
            ) {
              return (printResult = item);
            }
          });

          printResult
            ? message.reply(
                `${"**``` >>> " +
                  requiredProvince +
                  " Province Data" +
                  "\n\n" +
                  "Totale casi: " +
                  printResult.totale_casi +
                  "\n\nlast update: " +
                  printResult.data +
                  "```**"}`
              )
            : message.reply(requiredProvince + " doesn't exist as a Province");
        } catch (error) {
          message.reply(
            "Some error occurred during the API call on Province. " + error
          );
        }
      }

      /* if (message.content.includes(PREFIX + "covid chart radar ")) {
        message.reply(" Ok, trying to build a Radar Chart")
        .then(sentMessage => sentMessage.delete({timeout: 1800}));
      } */
    }
  );
});
