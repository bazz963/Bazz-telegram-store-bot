const { Telegraf, Markup } = require('telegraf');

// 1. CONFIGURATION
const BOT_TOKEN = 'YOUR_BOTFATHER_TOKEN_HERE'; 
const bot = new Telegraf(BOT_TOKEN);

// 2. FORCE JOIN SETTINGS (Bot must be admin in this channel)
const REQUIRED_CHANNEL = '@BazzHacker963'; 

// 3. ADMIN SETTINGS (Your personal numerical Telegram ID)
const ADMIN_ID = 123456789; 

// Database to hold user IDs for broadcasting
const activeUsers = new Set();

// --- MIDDLEWARE: FORCE CHANNEL JOIN ---
bot.use(async (ctx, next) => {
    if (!ctx.from) return next();
    
    const userId = ctx.from.id;
    activeUsers.add(userId);

    if (userId === ADMIN_ID) {
        return next();
    }

    try {
        const member = await ctx.telegram.getChatMember(REQUIRED_CHANNEL, userId);
        const status = member.status;

        if (status === 'member' || status === 'administrator' || status === 'creator') {
            return next();
        }
    } catch (error) {
        console.error("Error checking channel membership:", error);
    }

    const joinKeyboard = Markup.inlineKeyboard([
        [Markup.button.url('📢 Join Our Channel First ↗️', `https://t.me/${REQUIRED_CHANNEL.replace('@', '')}`)],
        [Markup.button.callback('🔄 Try Again / Refresh', 'check_again')]
    ]);

    return ctx.reply(
        `❌ <b>Access Denied!</b>\n\n` +
        `You must join our main channel to use this bot's services. Please join using the link below, then press refresh!`, 
        { parse_mode: 'HTML', ...joinKeyboard }
    );
});

bot.action('check_again', (ctx) => {
    ctx.answerCbQuery('Checking status...');
    ctx.reply('🎉 Thank you! Send /start to reload the store menu.');
});


// --- ADMIN BROADCAST SYSTEM ---
bot.command('broadcast', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) {
        return ctx.reply("❌ You do not have permission to use this command.");
    }

    const messageText = ctx.message.text.split(' ').slice(1).join(' ');

    if (!messageText) {
        return ctx.reply("⚠️ Format error. Use: <code>/broadcast your message here</code>", { parse_mode: 'HTML' });
    }

    ctx.reply(`📢 Starting broadcast to ${activeUsers.size} users...`);

    let successCount = 0;
    let failureCount = 0;

    for (const user of activeUsers) {
        try {
            await ctx.telegram.sendMessage(user, messageText, { parse_mode: 'HTML' });
            successCount++;
        } catch (err) {
            failureCount++;
        }
    }

    ctx.reply(`✅ <b>Broadcast Completed!</b>\n\n🔹 Success: ${successCount}\n🔸 Failed/Blocked: ${failureCount}`, { parse_mode: 'HTML' });
});


// --- MAIN MENU INTERFACE (/start) ---
bot.start((ctx) => {
    const photoUrl = 'https://picsum.photos/id/28/800/600'; 
    
    // Updated Title Header to BAZZ STORE BOT
    const captionText = 
        `<tg-emoji emoji-id="6098430411552068356">✨</tg-emoji> <b>BAZZ STORE BOT</b>\n\n` +
        `<blockquote>Welcome to the Store Bot.\nSelect an option from the menu below.</blockquote>`;

    const inlineKeyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback('💎 [ Buy Vps ]', 'buy_vps'),
            Markup.button.callback('🔴 [ Buy Vps Ac... ]', 'buy_vps_acc')
        ],
        [
            Markup.button.callback('🔥 [ Buy Panel ]', 'buy_panel'),
            Markup.button.callback('🛡️ [ Install Panel... ]', 'install_panel')
        ],
        [
            Markup.button.callback('💳 [ Payment Method ]', 'payment_method'),
            Markup.button.callback('🙏 [ Thanks ]', 'thanks_team')
        ],
        [
            Markup.button.callback('⚠️ [ Contact Support ]', 'support')
        ],
        [
            Markup.button.url('📺 [ Main Channel ] ↗️', 'https://t.me/BazzHacker963')
        ],
        [
            Markup.button.url('🪓 [ Developer ] ↗️', 'https://t.me/BazzHacker963')
        ]
    ]);

    ctx.replyWithPhoto(photoUrl, {
        caption: captionText,
        parse_mode: 'HTML',
        ...inlineKeyboard
    });
});


// --- STORE FRONT INLINE HANDLERS ---

// 1. VPS ITEMS (Uses Emoji 2, 6, 7)
bot.action('buy_vps', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(
        `<tg-emoji emoji-id="5465283645788937267">📦</tg-emoji> <b>VPS/RDP PACKAGES & PRICES</b>\n\n` +
        `<tg-emoji emoji-id="5908781036765977075">✅</tg-emoji> 4GB RAM | 2vCPU | 1 Month - 3$\n` +
        `<tg-emoji emoji-id="5908781036765977075">✅</tg-emoji> 8GB RAM | 2vCPU | 1 Month - 6$\n` +
        `<tg-emoji emoji-id="5908781036765977075">✅</tg-emoji> 8GB RAM | 4vCPU | 1 Month - 7.5$\n` +
        `<tg-emoji emoji-id="5908781036765977075">✅</tg-emoji> 16GB RAM | 4vCPU | 1 Month - 12$\n` +
        `<tg-emoji emoji-id="5908781036765977075">✅</tg-emoji> 16GB RAM | 8vCPU | 1 Month - 16$\n\n` +
        `<b>—— Benefits ——</b>\n` +
        `<tg-emoji emoji-id="5841528141037705335">✨</tg-emoji> Free Install Pterodactyl Panel\n` +
        `<tg-emoji emoji-id="5841528141037705335">✨</tg-emoji> Free Request Domain\n` +
        `<tg-emoji emoji-id="5841528141037705335">✨</tg-emoji> Free Script Cpanel\n` +
        `<tg-emoji emoji-id="5841528141037705335">✨</tg-emoji> Free Egg Nodejs Python\n` +
        `<tg-emoji emoji-id="5841528141037705335">✨</tg-emoji> Free Install Theme | Nebula | billing | Nookure\n\n` +
        `Dm here ✉️\n` +
        `@BazzHacker963`, 
        { parse_mode: 'HTML' }
    );
});

// 2. VPS PLATFORM ACCOUNTS (Uses Emoji 3, 8, 9)
bot.action('buy_vps_acc', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(
        `<tg-emoji emoji-id="5346180972855443911">✨</tg-emoji> <b>VPS PLATFORM ACCOUNTS</b>\n\n` +
        `<tg-emoji emoji-id="5909080327267033624">⚡</tg-emoji> Digital Ocean 3 VPS Account | 2 Months - 12.75$\n` +
        `<tg-emoji emoji-id="5909080327267033624">⚡</tg-emoji> Digital Ocean 10 VPS Account | 2 Months - 21.25$\n` +
        `<tg-emoji emoji-id="5909080327267033624">⚡</tg-emoji> Aws 100$ Credit VPS Account | 6 Months - 12.75$\n` +
        `<tg-emoji emoji-id="5909080327267033624">⚡</tg-emoji> Linode 100$ Credit VPS Account | 2 Months - 12.75$\n` +
        `<tg-emoji emoji-id="5909080327267033624">⚡</tg-emoji> Azure Portal 200$ Credit Account | 2 Months - 11.45$\n\n` +
        `<b>—— System Contact ——</b>\n\n` +
        `<tg-emoji emoji-id="5841720770320931540">👑</tg-emoji> Dm here: @BazzHacker963`,
        { parse_mode: 'HTML' }
    );
});

// 3. PTERODACTYL HOSTING PANELS (Uses Emoji 4, 10, 11)
bot.action('buy_panel', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(
        `<b>Pterodactyl Panel Price</b> <tg-emoji emoji-id="5843728697596583090">✨</tg-emoji>\n` +
        `<tg-emoji emoji-id="6266995104687330978">🔥</tg-emoji> 5GB RAM | 1 Month - 100Rs\n` +
        `<tg-emoji emoji-id="6266995104687330978">🔥</tg-emoji> 6GB RAM | 1 Month - 300Rs\n` +
        `<tg-emoji emoji-id="6266995104687330978">🔥</tg-emoji> 7GB RAM | 1 Month - 350Rs\n` +
        `<tg-emoji emoji-id="6266995104687330978">🔥</tg-emoji> 8GB RAM | 1 Month - 450Rs\n` +
        `<tg-emoji emoji-id="6266995104687330978">🔥</tg-emoji> 9GB RAM | 1 Month - 553Rs\n` +
        `<tg-emoji emoji-id="6266995104687330978">🔥</tg-emoji> 10GB RAM | 1 Month - 612Rs\n` +
        `<tg-emoji emoji-id="6266995104687330978">🔥</tg-emoji> 15GB RAM | 1 Month - 723Rs\n\n` +
        `<b>—— High Quality Panels ——</b>\n\n` +
        `<tg-emoji emoji-id="6267128480601741166">💎</tg-emoji> UNLIMITED RAM | 1 Month - 1000Rs\n` +
        `<tg-emoji emoji-id="6267128480601741166">💎</tg-emoji> ADMIN PANEL | 1 Month - 2000Rs\n\n` +
        `<b>—— Admin Panel Benefits ——</b>\n\n` +
        `» Access Full Panel\n` +
        `» Create Unlimited Ram Panels\n` +
        `» Create Python | NodeJs Panels\n` +
        `» High Speed Panel\n` +
        `» 24/7 Online\n\n` +
        `Dm here ✉️ @BazzHacker963`,
        { parse_mode: 'HTML' }
    );
});

// 4. AUTOMATED SETUP SERVICE (Uses Emoji 12, 13)
bot.action('install_panel', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(
        `<tg-emoji emoji-id="6284971355297290197">🛠️</tg-emoji> <b>Install Panels</b>\n\n` +
        `<tg-emoji emoji-id="5226891198261660939">🔮</tg-emoji> Install Pterodactyl - 4$\n` +
        `<tg-emoji emoji-id="5226891198261660939">🔮</tg-emoji> Install Pelican - 4$\n` +
        `<tg-emoji emoji-id="5226891198261660939">🔮</tg-emoji> Install Jexactyl - 4.25$\n` +
        `<tg-emoji emoji-id="5226891198261660939">🔮</tg-emoji> Install Airlink - 4$\n` +
        `<tg-emoji emoji-id="5226891198261660939">🔮</tg-emoji> Install DarcoPanel - 4$\n\n` +
        `<b>—— Benefits ——</b>\n\n` +
        `» Free Domain\n` +
        `» Free Nodejs | Python\n` +
        `» Free Wings\n` +
        `» Free Install Theme | Nebula , billing , Nookure , Darknight\n\n` +
        `Dm here: ✉️ @BazzHacker963`,
        { parse_mode: 'HTML' }
    );
});

// 5. PAYMENT METHODS BOX (Uses Emoji 14, 15, 16)
bot.action('payment_method', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(
        `<tg-emoji emoji-id="6098386985137738167">💳</tg-emoji> <b>Available Payment Gateways</b> <tg-emoji emoji-id="6269303009658802514">✨</tg-emoji>\n\n` +
        `▪️ Easypaisa\n` +
        `▪️ Jazzcash\n` +
        `▪️ Nayapay\n\n` +
        `▪️ Binance USDT and Crypto\n` +
        `▪️ PayPal\n` +
        `▪️ Dana\n` +
        `▪️ Qris\n` +
        `▪️ Go pay`,
        { parse_mode: 'HTML' }
    );
});

// 6. THANKS BOX (Uses Emoji 5)
bot.action('thanks_team', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(`Thanks to team Bazz! <tg-emoji emoji-id="5431795571033645908">💖</tg-emoji>`, { parse_mode: 'HTML' });
});

// 7. SUPPORT LINK
bot.action('support', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(`📞 <b>Contact Support Desk:</b> @BazzHacker963`, { parse_mode: 'HTML' });
});


// --- INITIALIZE LONG POLLING SHUTDOWN LIFECYCLES ---
bot.launch().then(() => {
    console.log('🚀 Premium Store Bot is running flawlessly!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

