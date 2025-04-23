# 📄 Gemini PDF Text Extraction
This project utilizes the [Google Gemini API](https://ai.google.dev/) to extract and correct text from PDF files, including those that are scanned images or have poor OCR qualityIt leverages AI-powered OCR and natural language processing to ensure accurate and readable text output

## 🧰 Features

- **AI-Powered Text Extraction** Processes PDFs using Google's Gemini API to extract text, even from image-based document.
- **Automatic Text Correction** Enhances readability by correcting spelling, grammar, and formatting issue.
- **Batch Processing** Automatically processes all PDFs in the `input/` directory and saves the results in the `output/` director.
- **Retry Mechanism** Implements a retry strategy to handle API rate limits or transient error.

## 📁 Project Structure

```
gemini-pdf-text-extraction/
├── input/             # Directory to place input PDF files
├── output/            # Directory where extracted text files will be saved
├── index.js           # Main script to run the extraction process
├── .env.example       # Example environment variables file
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Exact versions of installed dependencies
└── README.md          # Project documentation
```

## ⚙️ Prerequisites

- **Node.js**: Ensure you have Node.js installed on your systm.
- **Google Gemini API Key**: Obtain an API key from the [Google AI Studio](https://ai.google.dev).

## 🛠️ Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anhdiepmmk/gemini-pdf-text-extraction.git
   cd gemini-pdf-text-extraction
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
  - Create a `.env` file in the root directry.
  - Copy the contents of `.env.example` into `.ev`.
  - Replace `your_google_genai_api_key` with your actual Google Gemini API ey:
     ```
     GOOGLE_GENAI_API_KEY=your_google_genai_api_key
     ```

4. **Prepare Input Files**:
  - Place the PDF files you want to process into the `input/` directry.

## 🚀 Running the Scrpt

To start the text extraction process,run:

```bash
node index.js
```


The script will process each PDF in the `input/` directory, extract and correct the text using the Gemini API, and save the results as `.txt` files in the `output/` direcory.

## 🔄 Retry Straegy

The script includes a retry mechanism using the `async-retry` package to handle potential API rate limits or transient errs. It will attempt to process each file up to 10 times, with randomized delays between reries.

## 📄 Otput

For each processed PDF file, a corresponding `.txt` file will be created in the `output/` directory, preserving the original fiename.

## 📬 Contribtions

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the functionality or address ay bugs.

---

For more information or to report issues, please visit the [GitHub repository](https://github.com/anhdiepmmk/gemini-pdf-text-extrction). 
