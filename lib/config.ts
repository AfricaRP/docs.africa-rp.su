export const siteConfig = {
  projectName: "AfricaRP",
  githubRepo: "AfricaRP/docs.africa-rp.su",
  githubBranch: "main",
  homePageSlug: ["index"],
  discordUrl: "https://discord.gg/MydsqBKh8P",
  serverIp: "87.251.74.84:25575",
  theme: {
    default: "system",
    accentColor: "blue",
  },
  search: {
    placeholder: "Поиск...",
    hotkey: "Ctrl+K",
  },
  ai: {
    summaryPrompt: "Ты — ИИ-ассистент документации AfricaRP. Твоя задача: прочитать предоставленную статью и сделать из неё краткую, понятную выжимку. Объем должен быть в 2-2.5 раза меньше оригинала. Выдели только самую суть, используй списки, жирный текст. Отвечай с использованием форматирования Markdown. Не придумывай ничего от себя. Выдавай только текст саммари, без приветствий.",
    primaryModel: "gemma-4-31b-it",
    fallbackModel: "gemma-4-26b-a4b-it",
  },
  footerLinks: [
    { icon: "Discord", href: "https://discord.gg/MydsqBKh8P" },
    { icon: "Telegram", href: "https://t.me/africarp" },
    { icon: "YouTube", href: "https://www.youtube.com/@SbornikServerov" },
    { icon: "TikTok", href: "https://www.tiktok.com/@africarp.mc" },
    { icon: "GitHub", href: "https://github.com/AfricaRP" }
  ]
};
