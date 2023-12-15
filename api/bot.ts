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
    default:
      ctx.reply("Got:" + ctx.message.text);
  }
});

bot.on("inline_query", async (ctx) => {
  // 创建一个单独的 inline query 结果。
  const result = InlineQueryResultBuilder.article(
    "id:show-proof",
    "Show proof",
    {
      reply_markup: new InlineKeyboard().url(
        "Check this card",
        "https://card.zkid.app/"
      ),
    }
  ).photo("id-0", "https://grammy.dev/images/grammY.png", {
    title: "test title",
    description: "test description",
    caption: "test caption",
  });

  // 回复 inline query.
  await ctx.answerInlineQuery(
    [result], // 用结果列表回复
    { cache_time: 30 * 24 * 3600 } // 30 天的秒数
  );
});

export default bot;
