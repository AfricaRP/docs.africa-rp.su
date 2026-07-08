import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded (if running locally)
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Also load from config.ts but since it's TS, we can just hardcode the prompt here or compile it
// For simplicity in the script, we duplicate the config prompt
const summaryPrompt = "Ты — ИИ-ассистент документации AfricaRP. Твоя задача: прочитать предоставленную статью и сделать из неё краткую, понятную выжимку. Объем должен быть в 2-2.5 раза меньше оригинала. Выдели только самую суть, используй списки, жирный текст. Отвечай с использованием форматирования Markdown. Не придумывай ничего от себя. Выдавай только текст саммари, без приветствий.";
const primaryModel = "gemma-4-31b-it";
const fallbackModel = "gemma-4-26b-a4b-it";

const contentDir = path.join(__dirname, "../content");
const outputDir = path.join(__dirname, "../public/summaries");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateSummaryForFile(filePath, slug) {
  const content = fs.readFileSync(filePath, "utf-8");
  const outPath = path.join(outputDir, `${slug}.json`);

  if (fs.existsSync(outPath)) {
    console.log(`[SKIP] Summary already exists for ${slug}`);
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("No GEMINI_API_KEY provided. Skipping generation.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const config = {
    temperature: 0.7,
    systemInstruction: [{ text: summaryPrompt }],
  };

  const contents = [
    {
      role: "user",
      parts: [{ text: content }],
    },
  ];

  console.log(`[START] Generating summary for ${slug}...`);
  try {
    let response;
    try {
      response = await ai.models.generateContent({
        model: primaryModel,
        config,
        contents,
      });
    } catch (err) {
      console.warn(`[WARN] Primary model failed for ${slug}. Trying fallback...`, err.message);
      response = await ai.models.generateContent({
        model: fallbackModel,
        config,
        contents,
      });
    }

    if (response && response.text) {
      fs.writeFileSync(
        outPath,
        JSON.stringify({ summary: response.text }, null, 2),
        "utf-8"
      );
      console.log(`[SUCCESS] Saved summary for ${slug}`);
    } else {
      console.error(`[ERROR] Empty response for ${slug}`);
    }
  } catch (error) {
    console.error(`[ERROR] Failed to generate summary for ${slug}:`, error.message);
  }
}

async function scanAndGenerate(dir, currentSlug = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const nameWithoutNumber = entry.name
      .replace(/^\d+-/, "")
      .replace(/\.mdx?$/, "");
    const slugPart = nameWithoutNumber
      .toLowerCase()
      .replace(/_/g, "-")
      .replace(/ /g, "-");

    if (entry.isDirectory()) {
      await scanAndGenerate(path.join(dir, entry.name), [...currentSlug, slugPart]);
    } else if (entry.name.endsWith(".mdx")) {
      let finalSlug = [...currentSlug, slugPart];
      if (entry.name === "index.mdx" || entry.name === "00-index.mdx") {
        finalSlug = currentSlug;
      }
      const slugStr = finalSlug.length > 0 ? finalSlug.join("-") : "index";
      await generateSummaryForFile(path.join(dir, entry.name), slugStr);
    }
  }
}

async function main() {
  console.log("Starting AI Summary Generation...");
  await scanAndGenerate(contentDir);
  console.log("Finished generating summaries.");
}

main();
