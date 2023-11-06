"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const token = process.env.BOT_TOKEN;
if (!token)
    throw new Error("BOT_TOKEN is unset");
const bot = new grammy_1.Bot(token);
// 处理 /start 命令。
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// 处理其他的消息。
bot.on("message", (ctx) => ctx.reply("Got another message!"));
// 现在，你已经确定了将如何处理信息，可以开始运行你的 bot。
// 这将连接到 Telegram 服务器并等待消息。
exports.default = (0, grammy_1.webhookCallback)(bot, "http");
