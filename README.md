# 📄 PDF to Text Extractor using Google Gemini AI

This Node.js script uses the [Google Gemini API](https://github.com/google-gemini/api-examples) to extract and correct text from PDFs — even low-quality or image-based PDFs that can't be handled by traditional parsers.

## 💡 Why This Script?

Some PDFs are scanned images or poorly OCR'd documents, making text extraction difficult or inaccurate. This script uses **AI-powered OCR and natural language correction** to extract and clean the text, ensuring:
- Spelling and grammar are corrected
- Sentences are clarified
- Formatting (like line breaks) is preserved

## 🛠️ Prerequisites

1. **Node.js** installed
2. A **Google Gemini API key** (`GOOGLE_GENAI_API_KEY`)
3. `input/` and `output/` folders created in the project root
4. The following packages installed:

```bash
npm install dotenv path fs @google/genai async-retry
```

## 📁 File Structure

```
project-root/
├── input/      # Put your PDF files here
├── output/     # Extracted text files will be saved here
├── .env        # Contains your API key
└── script.js   # Main extraction script
```

## 🔐 .env Example

```
GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here
```

## 📜 Script Overview

- Uploads a PDF file to Google Gemini
- Sends an instruction to clean and extract text
- Automatically retries if errors occur (e.g., rate limits)
- Skips files that are already processed
- Saves the cleaned text to the `output/` folder

## 🔁 Retry Strategy

Built-in exponential backoff with `async-retry`:
- Up to 10 retries
- Randomized delay between 5–20 seconds

## 🚀 How to Run

```bash
node script.js
```

## 📦 Example Use Case

You have a folder full of old scanned PDFs. Just drop them into the `input/` folder, run the script, and get clean `.txt` files in `output/`.
