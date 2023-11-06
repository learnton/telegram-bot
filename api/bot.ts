import { Bot, Keyboard } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

const token = Deno.env.get("BOT_TOKEN") || "";
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

// 处理 /start 命令。
bot.command("start", (ctx) =>
  ctx.reply("Welcome! Up and running.", {
    reply_markup: new Keyboard().webApp(
      "webApp",
      "https://learnton.github.io/twa-vite/"
    ),
  })
);
// 处理其他的消息。
bot.on("message", (ctx) => ctx.reply("Got another message!"));

export default bot;
