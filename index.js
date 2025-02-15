require("./server");
require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("The bot is ready!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "hi") {
    message.reply("hi!");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "calculate") {
    const num1 = interaction.options.getNumber("num1");
    const num2 = interaction.options.getNumber("num2");
    const operator = interaction.options.getString("operator");

    let result;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero!";
        break;
      default:
        result = "Invalid operator!";
    }

    interaction.reply(`Result: ${result}`);
  }
});

client.login(process.env.TOKEN);
