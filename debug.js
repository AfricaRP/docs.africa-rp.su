const fs = require("fs");
const content = fs.readFileSync("content/technical/dlya-redaktorov.mdx", "utf-8");
const lines = content.split("\n");
let codeBlockDelimiter = null;
let ignoredBlockDepth = 0;
const ignoredTags = ["ParallaxWindow", "HoloCard", "DecisionTree", "MarginNote", "GlowCard", "DecisionStep", "Accordion", "Steps"];
let entries = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const cbMatch = line.trim().match(/^(`{3,})/);
  if (cbMatch) {
    if (!codeBlockDelimiter) {
      codeBlockDelimiter = cbMatch[1];
      continue;
    } else if (cbMatch[1].length >= codeBlockDelimiter.length) {
      codeBlockDelimiter = null;
      continue;
    }
  }

  if (codeBlockDelimiter) continue;

  for (const tag of ignoredTags) {
    if (line.match(new RegExp("^\\s*<" + tag, "i")) && !line.match(new RegExp("<\\s*/\\s*" + tag + "\\s*>", "i"))) {
      ignoredBlockDepth++;
    } else if (line.match(new RegExp("^\\s*<\\s*/\\s*" + tag + "\\s*>", "i"))) {
      ignoredBlockDepth = Math.max(0, ignoredBlockDepth - 1);
    }
  }

  const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);
  if (headingMatch && ignoredBlockDepth === 0) {
     entries++;
     console.log('Heading:', headingMatch[2].trim());
  }
}
console.log("Total entries:", entries);