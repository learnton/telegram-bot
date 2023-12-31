import { webhookCallback } from "https://deno.land/x/grammy@v1.8.3/mod.ts";
// 你可以将其修改为正确的方式来导入你的 `Bot` 对象。
import bot from "./api/bot.ts";

const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
