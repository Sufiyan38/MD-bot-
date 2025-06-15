const keepAlive = require("./keepAlive.js");
keepAlive();
const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.on("ready", () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  }

  if (commandName === "ban") {
    const user = options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return interaction.reply({
        content: "❌ You don't have permission to ban.",
        ephemeral: true,
      });
    }

    if (!member) return interaction.reply("❌ Member not found.");

    await member
      .ban()
      .then(() => {
        interaction.reply(`✅ Banned ${user.tag}`);
      })
      .catch((err) => {
        interaction.reply("❌ I couldn't ban the user.");
      });
  }

  if (commandName === "kick") {
    const user = options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    ) {
      return interaction.reply({
        content: "❌ You don't have permission to kick.",
        ephemeral: true,
      });
    }

    if (!member) return interaction.reply("❌ Member not found.");

    await member
      .kick()
      .then(() => {
        interaction.reply(`✅ Kicked ${user.tag}`);
      })
      .catch((err) => {
        interaction.reply("❌ I couldn't kick the user.");
      });
  }

  if (commandName === "timeout") {
    const user = options.getUser("user");
    const duration = options.getInteger("duration");
    const member = interaction.guild.members.cache.get(user.id);

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers,
      )
    ) {
      return interaction.reply({
        content: "❌ You don't have permission to timeout.",
        ephemeral: true,
      });
    }

    if (!member) return interaction.reply("❌ Member not found.");

    await member
      .timeout(duration * 1000)
      .then(() => {
        interaction.reply(`✅ Timed out ${user.tag} for ${duration} seconds.`);
      })
      .catch((err) => {
        interaction.reply("❌ Failed to timeout user.");
      });
  }
});

client.login(process.env.TOKEN);
// Express server for UptimeRobot ping
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// Ye tumhara pehle se existing code hai
client.on("interactionCreate", async (interaction) => {
  // ... tumhara commands wala code
});

// 👇 Ye line se neeche server wala code paste karo:
