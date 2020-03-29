import "@babel/register";
const fs = require("fs");
import { Message } from "discord.js";
import { config } from "dotenv";
import { SickBotClient } from "./src/SickBotClient";
import {
  helpCommand,
  covidCommand,
  covidRegionCommand,
  covidProvinceCommand,
  covidChartRegionStackedBar,
  covidChartRegionRadar
} from "./src/commands";

config({ path: "./.env" });
const { BOT_TOKEN, DEV_BOT_TOKEN } = process.env;

const client: SickBotClient = new SickBotClient(
  process.env.NODE_ENV === "production" ? BOT_TOKEN : DEV_BOT_TOKEN
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

      //Standards Commands
      if (cmd === "covid help") {
        helpCommand(message);
      }

      if (cmd === "covid") {
        covidCommand(message);
      }

      if (message.content.includes(PREFIX + "covid r ")) {
        covidRegionCommand(message);
      }

      if (message.content.includes(PREFIX + "covid p ")) {
        covidProvinceCommand(message);
      }

      //Charts Commands
      if (message.content.includes(PREFIX + "covid chart r ")) {
        covidChartRegionStackedBar(message);
      }

      /* devo lavorare sul substring
      if (message.content.includes(PREFIX + "covid cr radar ")) {
        covidChartRegionRadar(message);
      } */
    }
  );
});
