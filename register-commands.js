require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "calculate",
    description: "Performs a basic arithmetic operation",
    options: [
      {
        name: "num1",
        description: "First number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "operator",
        description: "Choose the operator",
        type: ApplicationCommandOptionType.String, // Changed from Boolean to String
        choices: [
          {
            name: "Addition (+)",
            value: "+",
          },
          {
            name: "Subtraction (-)",
            value: "-",
          },
          {
            name: "Multiplication (*)",
            value: "*",
          },
          {
            name: "Division (/)",
            value: "/",
          },
        ],
        required: true, // Ensure this option is mandatory
      },
      {
        name: "num2",
        description: "Second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function registerCommands() {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
}

registerCommands();
