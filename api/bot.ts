import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

const token = Deno.env.get("BOT_TOKEN") || "";
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

// 处理 /start 命令。
bot.command("start", (ctx) =>
  ctx.reply("Welcome! Up and running.", {
    reply_markup: new InlineKeyboard().webApp(
      "ton-webapp",
      "https://learnton.github.io/ton-webapp/"
    ),
  })
);
// 处理其他的消息。
bot.on("message", (ctx) => {
  switch (ctx.message) {
    case "clear":
      ctx.reply("will clear keyboard", {
        reply_markup: { remove_keyboard: true },
      });

      break;
    default:
      ctx.reply("Got:" + ctx.message);
  }
});

export default bot;
