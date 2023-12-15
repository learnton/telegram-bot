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
        caption: "test caption",
        reply_markup: new InlineKeyboard().url(
          "Check this card",
          "https://card.zkid.app/"
        ),
      });
      break;
    case "card2":
      ctx.reply(
        `<b>Membership Card</b> with message
        <a href="https://grammy.dev/images/grammY.png"></a>`,
        {
          parse_mode: "HTML",
          disable_web_page_preview: false,
          reply_markup: new InlineKeyboard().url(
            "Check this card",
            "https://card.zkid.app/"
          ),
        }
      );
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
  }).text(
    `<b>Membership Card</b> with inlineQuery
  <a href="https://grammy.dev/images/grammY.png"></a>`,
    { parse_mode: "html", disable_web_page_preview: false }
  );

  // 回复 inline query.
  await ctx.answerInlineQuery([result]);
});

bot.on("inline_query", async (ctx) => {
  await ctx.answerInlineQuery([]);
});

export default bot;
