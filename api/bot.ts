import {
  Bot,
  InlineKeyboard,
  InlineQueryResultBuilder,
} from "https://deno.land/x/grammy@v1.19.2/mod.ts";

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
  switch (ctx.message.text) {
    case "clear":
      ctx.reply("will clear keyboard", {
        reply_markup: { remove_keyboard: true },
      });

      break;
    case "card":
      ctx.replyWithPhoto("https://grammy.dev/images/grammY.png", {
        title: "Membership",
        description: "test description",
        caption: "test caption",
        reply_markup: new InlineKeyboard().url(
          "Check this card",
          "https://card.zkid.app/"
        ),
      });
      break;
    default:
      ctx.reply("Got:" + ctx.message.text);
  }
});

bot.inlineQuery(/test1/, async (ctx) => {
  const result = InlineQueryResultBuilder.article("id:test1", "test1", {
    reply_markup: new InlineKeyboard().url(
      "Check this card",
      "https://card.zkid.app/"
    ),
  }).photo("id-0", "https://grammy.dev/images/grammY.png", {
    title: "test title",
    description: "test description",
    caption: "test caption",
  });

  // 回复 inline query.
  await ctx.answerInlineQuery([result]);
});

bot.on("inline_query", async (ctx) => {
  await ctx.answerInlineQuery([]);
});

export default bot;
