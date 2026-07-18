const { Telegraf, Markup } = require('telegraf');

// This securely reads your bot token from Pterodactyl's settings
const BOT_TOKEN = '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ'; // <-- Put your BotFather token here!


// This triggers whenever someone presses "/start" in your bot
bot.start((ctx) => {
    // 1. Replace this link with your own banner image URL later if you want
    const photoUrl = 'https://picsum.photos/id/28/800/600'; 
    
    // 2. The text formatting matching your store's name
    const captionText = 
        `🗣️ **BAZZ Store BOT**\n\n` +
        `🚨 *Welcome to the Panel Bot.*\n` +
        `Select an option from the menu below.`;

    // 3. The exact grid layout from your screenshot
    const inlineKeyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback('💎 [ Buy Vps ]', 'buy_vps'),
            Markup.button.callback('🔴 [ Buy Vps Ac... ]', 'buy_vps_acc')
        ],
        [
            Markup.button.callback('🔥 [ Buy Panel ]', 'buy_panel'),
            Markup.button.callback('🎭 [ Install Panel... ]', 'install_panel')
        ],
        [
            Markup.button.callback('⚠️ [ Contact Support ]', 'support')
        ],
        [
            Markup.button.url('📺 [ Main Channel ] ↗️', 'https://t.me/telegram'), // Change to your channel link
        ],
        [
            Markup.button.url('🪓 [ Developer ] ↗️', 'https://t.me/telegram') // Change to your Telegram handle
        ]
    ]);

    // Sends the image, text, and buttons together
    ctx.replyWithPhoto(photoUrl, {
        caption: captionText,
        parse_mode: 'Markdown',
        ...inlineKeyboard
    });
});

// --- BUTTON ACTIONS (What happens when a user clicks a button) ---

bot.action('buy_vps', (ctx) => {
    ctx.answerCbQuery(); // Stops the loading spinner on the button
    ctx.reply('📦 **Available VPS Plans:**\n\n• Plan 1: 2GB RAM - $5/mo\n• Plan 2: 4GB RAM - $10/mo\n\nContact support to purchase!');
});

bot.action('buy_vps_acc', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('🔑 **VPS Accounts:**\n\nWe offer pre-configured DigitalOcean, AWS, and Linode accounts. Please message the developer for stock updates.');
});

bot.action('buy_panel', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('🔥 **Pterodactyl Panels:**\n\nGet your own private Pterodactyl hosting panel setup instantly. Price starts from $3/month.');
});

bot.action('install_panel', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('🎭 **Panel Installation Service:**\n\nDon\'t know how to install Pterodactyl? Our automatic script or manual installation support will handle it for you.');
});

bot.action('support', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('⚠️ **Support Desk:**\n\nNeed help? Open a ticket or message our official support handle directly.');
});

// Launches the bot application
bot.launch().then(() => {
    console.log('🚀 BAZZ Store Bot is successfully running online!');
});

// Safe closing system if the server restarts
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

