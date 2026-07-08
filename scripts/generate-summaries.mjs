import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const summaryPrompt = "Ты — ИИ-ассистент документации AfricaRP. Твоя задача: прочитать предоставленную статью и сделать из неё краткую, понятную выжимку. Объем должен быть в 2-2.5 раза меньше оригинала. Выдели только самую суть, используй списки, жирный текст. Отвечай с использованием форматирования Markdown. Не придумывай ничего от себя. Выдавай только текст саммари, без приветствий.";
const primaryModel = "gemma-4-31b-it";
const fallbackModel = "gemma-4-26b-a4b-it";

const contentDir = path.join(__dirname, "../content");
const outputDir = path.join(__dirname, "../public/summaries");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function attemptGeneration(ai, model, config, contents, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(2000);
    }
  }
}

async function generateSummaryForFile(filePath, slug) {
  const content = fs.readFileSync(filePath, "utf-8");
  const hash = crypto.createHash("sha256").update(content).digest("hex");
  const outPath = path.join(outputDir, `${slug}.json`);

  if (fs.existsSync(outPath)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(outPath, "utf-8"));
      if (existingData.hash === hash) {
        return;
      }
    } catch (e) {}
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;

  const ai = new GoogleGenAI({ apiKey });
  const config = { temperature: 0.7, systemInstruction: [{ text: summaryPrompt }] };
  const contents = [{ role: "user", parts: [{ text: content }] }];

  try {
    let response;
    try {
      response = await attemptGeneration(ai, primaryModel, config, contents, 3);
    } catch (err) {
      response = await attemptGeneration(ai, fallbackModel, config, contents, 3);
    }

    if (response && response.text) {
      fs.writeFileSync(
        outPath,
        JSON.stringify({ hash, summary: response.text }, null, 2),
        "utf-8"
      );
    }
  } catch (error) {}
}

async function scanAndGenerate(dir, currentSlug = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const nameWithoutNumber = entry.name.replace(/^\d+-/, "").replace(/\.mdx?$/, "");
    const slugPart = nameWithoutNumber.toLowerCase().replace(/_/g, "-").replace(/ /g, "-");

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
  await scanAndGenerate(contentDir);
}

main();
