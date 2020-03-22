import "@babel/register";
import { Message, MessageEmbed } from "discord.js";
import { config } from "dotenv";
import { SickBotClient } from "./src/SickBotClient";
import { covidMessage, covidProvince } from "./src/utilities/";

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
const { BOT_TOKEN, DEV_BOT_TOKEN } = process.env;

const client: SickBotClient = new SickBotClient(
  String(process.env.NODE_ENV) === "production" ? BOT_TOKEN : DEV_BOT_TOKEN
);
const PREFIX: string = "!!";

client.on("ready", (): void => {
  console.log(`Hello, I'm sick but ready!\nStatus: ${process.env.NODE_ENV}`);

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

      if (cmd === "covid help") {
        const help = new MessageEmbed()
          .setTitle("SickBot Commands:")
          .setColor(0xf8e71c)
          .setDescription(
            `!!covid - return last data about Italy.
          \n!!covid r name - return last data about an Italian region.
          \n!!covid p name - return last data about italian Province.`
          );
        message.channel.send(help);
      }

      if (cmd === "covid") {
        message
          .reply(" retrieving Italian stats...")
          .then(sentMessage => sentMessage.delete({ timeout: 2000 }));
        try {
          const result: Array<ItalianLatests> | any = await italyLatest();
          message.channel.send({ embed: covidMessage("Italy data :", 0xf8e71c, result[0])});
        } catch (error) {
          message.reply(
            "Some error occurred during the API call on Italy. " + error
          );
        }
      }

      if (message.content.includes(PREFIX + "covid r ")) {
        const requiredRegion = message.content.substring(10).toLowerCase();
        message
          .reply(` retrieving ${requiredRegion.toUpperCase()}  Region data`)
          .then(sentMessage => sentMessage.delete({ timeout: 2000 }));
        try {
          const result: Array<ItalianRegionLatests> = await italyRegionsLatest();
          const printResult: any = result.filter(item => {
            return item.denominazione_regione.toLowerCase() === requiredRegion;
          });
          printResult
            ? message.channel
                .send({
                  embed: covidMessage(
                    `${requiredRegion.toUpperCase()} - (Region) :`,
                    0xf8e71c,
                    result[0]
                  )
                })
            : message.reply(requiredRegion + " doesn't exist as a region");
        } catch (error) {
          message.reply(
            "Some error occurred during the API call on Region. " + error
          );
        }
      }

      if (message.content.includes(PREFIX + "covid p ")) {
        const requiredProvince = message.content.substring(10).toLowerCase();
        message
          .reply(" retrieving " + requiredProvince + " province data")
          .then(sentMessage => sentMessage.delete({ timeout: 2000 }));

        try {
          const result: Array<ItalianProvinceLatests> = await italyProvinceLatest();
          const printResult = result.filter(item => {
            item.denominazione_provincia.toLowerCase() === requiredProvince
          });

          printResult
            ? message.channel
            .send({
              embed: covidProvince(
                `${requiredProvince.toUpperCase()} - (Region) :`,
                0xf8e71c,
                result[0]
              )
            })
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
