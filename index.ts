import "@babel/register";
import { Message } from "discord.js";
import { config } from "dotenv";
import { SickBotClient } from "./src/SickBotClient";

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

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
        message.reply(" retrieving Italian stats...");
        const result: Array<ItalianLatests> = await italyLatest();

        result.map(item => {
          message.channel.send(
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
      }

      if (message.content.includes(PREFIX + "covid r ")) {
        try {
          const requiredRegion = message.content.substring(10).toLowerCase();
          const newRequiredRegion = capitalizeFirstLetter(requiredRegion);
          message.reply(" retrieving " + newRequiredRegion + " Region data");

          const result: Array<ItalianRegionLatests> = await italyRegionsLatest();
          let printResult: any = false;

          const checkResult = region => {
            result.filter(item => {
              if (item.denominazione_regione === region) {
                return (printResult = item);
              } else return false;
            });

            printResult
              ? message.reply(`
                ${"```>>> " +
                  region +
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
              : message.reply(region + " doesn't exist as a region");
          };

          checkResult(newRequiredRegion);
        } catch (error) {
          message.reply(
            "Some error occurred during the API call on Region. " + error
          );
        }
      }

      if (message.content.includes(PREFIX + "covid p ")) {
        try {
          const requiredProvince = message.content.substring(10).toLowerCase();
          const newRequiredProvince = capitalizeFirstLetter(requiredProvince);
          message.reply(
            " retrieving " + newRequiredProvince + " province data"
          );
          const result: Array<ItalianProvinceLatests> = await italyProvinceLatest();
          let printResult: any = false;

          const checkResult = province => {
            result.filter(item => {
              if (item.denominazione_provincia === province) {
                return (printResult = item);
              } else return false;
            });

            printResult
              ? message.reply(
                  `${"```>>> " +
                    province +
                    " Province Data" +
                    "\n\n" +
                    "Totale casi: " +
                    printResult.totale_casi +
                    "\n\nlast update: " +
                    printResult.data +
                    "```"}`
                )
              : message.reply(province + " doesn't exist as a Province");
          };

          checkResult(newRequiredProvince);
        } catch (error) {
          message.reply(
            "Some error occurred during the API call on Province. " + error
          );
        }
      }

      if (message.content.includes(PREFIX + "covid chart radar ")) {
        message.reply(" Ok, trying to build a Radar Chart");
      }
    }
  );
});
