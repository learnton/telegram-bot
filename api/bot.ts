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
      "https://ton.zkid.xyz/"
    ),
  })
);
bot.command("card", (ctx) =>
  ctx.reply("Want show your card?", {
    reply_markup: new InlineKeyboard().webApp(
      "pick a card first",
      "https://ton.zkid.xyz/cards"
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
      ctx.replyWithPhoto(
        "https://zcloak.s3.us-east-2.amazonaws.com/prod/1694514129471_mEMGaae66Z.png",
        {
          caption: "<b>Membership Card</b>",
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().url(
            "Check this card",
            "https://card.zkid.app/"
          ),
        }
      );
      break;

    default:
  }
});

bot.inlineQuery(/card/, async (ctx) => {
  const result = InlineQueryResultBuilder.photo(
    "id:test1",
    "https://zcloak.s3.us-east-2.amazonaws.com/prod/1694514129471_mEMGaae66Z.png",
    {
      title: "Card",
      caption: "<b>Membership Card</b>",
      description: "Membership Card description",
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard().url(
        "Check this card",
        "https://card.zkid.app/"
      ),
    }
  );

  // 回复 inline query.
  await ctx.answerInlineQuery([result]);
});

bot.on("inline_query", async (ctx) => {
  await ctx.answerInlineQuery([]);
});

export default bot;
