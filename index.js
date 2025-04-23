// https://github.com/google-gemini/api-examples/blob/6779d2884a5e011173d827626a2c66d947c73cb9/javascript/files.js#L59-L76
require("dotenv").config();
const path = require("path");
const fs = require("fs/promises");
const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require("@google/genai");
const retry = require("async-retry");

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

async function extractTextFromPDF(filePath) {
  const file = await ai.files.upload({
    file: filePath,
    config: { mimeType: "application/pdf" },
  });

  const result = await ai.models.generateContent({
    model: "gemini-2.5-pro-exp-03-25",
    contents: createUserContent([
      createPartFromUri(file.uri, file.mimeType),
      "\n\n",
      "Đây là một file PDF có chất lượng kém (có thể do scan, lỗi nhận diện OCR, v.v.). Hãy trích xuất toàn bộ nội dung văn bản từ file này. Trong quá trình trích xuất, nếu phát hiện lỗi chính tả, ngữ pháp, cú pháp hoặc từ ngữ sai lệch, hãy tự động hiệu chỉnh lại sao cho câu văn rõ ràng, đúng nghĩa và dễ hiểu. Sau khi xử lý, trả lại toàn bộ nội dung đã được chỉnh sửa dưới dạng văn bản thuần (plain text), không định dạng, và giữ nguyên các ký tự xuống dòng (\n) như trong tài liệu gốc.",
    ]),
  });

  return result.text;
}

async function extractTextFromPDFWithRetry(filePath) {
  return retry(
    async () => {
      return await extractTextFromPDF(filePath);
    },
    {
      randomize: true,
      retries: 10,
      minTimeout: 5000,
      maxTimeout: 20000,
      onRetry: (e, attempt) => {
        console.log(
          `extractTextFromPDFWithRetry - onRetry - ${attempt}`,
          e.message,
        );
      },
    },
  );
}

async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, ms);
  });
}

async function exists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = await fs.readdir(path.join(__dirname, "input"));

  for (const file of files) {
    const pdfFilePath = path.resolve(__dirname, "input", file);

    const textFilePath = path.resolve(
      __dirname,
      "output",
      `${path.basename(file, path.extname(file))}.txt`,
    );


    if (await exists(textFilePath)) {
      console.log(`Skipping ${file} because ${textFilePath} already exists`);
      continue;
    }

    console.log(`Extracting text from ${file}...`);
    const text = await extractTextFromPDFWithRetry(pdfFilePath);

    await fs.writeFile(textFilePath, text);
    console.log(`Extracted text from ${file} and saved to ${textFilePath}`);

    await delay(6000);
  }
}

main();
