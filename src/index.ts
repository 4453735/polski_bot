import { Telegraf } from 'telegraf';
import {BOT_TOKEN} from "./AppConfig";
import {API_URL} from "./constants";
import {Context} from "telegraf";
import axios from "axios";

const bot = new Telegraf(BOT_TOKEN);

const getQuest = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

bot.command('start', async (ctx) => {
    const answer = await getQuest();
    let questCount = answer.length;
    let numberQuest = Math.round(Math.random() * questCount);
    await ctx.replyWithHTML(`${answer[numberQuest].quest}`);
    await ctx.replyWithHTML(`<span class="tg-spoiler">${answer[numberQuest].answ}</span>`, {
        reply_markup: {
            inline_keyboard: [
                [ { text: "Następne pytanie", callback_data: "next" } ]
            ]
        }
    });
});

bot.action("next", async ctx => {
    const answer = await getQuest();
    let questCount = answer.length;
    let numberQuest = Math.round(Math.random() * questCount);
    await ctx.replyWithHTML(`${answer[numberQuest].quest}`);
    await ctx.replyWithHTML(`<span class="tg-spoiler">${answer[numberQuest].answ}</span>`, {
        reply_markup: {
            inline_keyboard: [
                [ { text: "Następne pytanie", callback_data: "next" } ]
            ]
        }
    });
})

bot.command('next', async (ctx) => {
    const answer = await getQuest();
    let questCount = answer.length;
    let numberQuest = Math.round(Math.random()*questCount);
    await ctx.replyWithHTML(`${answer[numberQuest].quest}`);
    await ctx.replyWithHTML(`<span class="tg-spoiler">${answer[numberQuest].answ}</span>`);
})


bot.launch();