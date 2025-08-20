import streamlit as st
import google.generativeai as genai
import fitz  # PyMuPDF for PDF reading
import docx
import pytesseract
from PIL import Image
import io
import os
from practice import API_KEY  # Import API Key

# Set the tesseract path manually
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

# Configure Google AI API
genai.configure(api_key=API_KEY)  # Use imported API Key

# Gemini AI Model Setup
generation_config = {
    "temperature": 0.7,
    "top_p": 0.9,
    "top_k": 40,
    "max_output_tokens": 4096,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro-latest",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

# Streamlit UI Setup
st.set_page_config(page_title="Medical Report Analyzer", page_icon="🩺", layout="wide")
st.title("🩺 Medical Report Analyzer")
st.subheader("Upload a medical report (text, PDF, Word, or scanned image) for AI-based analysis.")

# File uploader
file_uploaded = st.file_uploader("Upload a medical report", type=["pdf", "txt", "docx", "png", "jpg", "jpeg"])

# Function to extract text from different file formats
def extract_text(file_uploaded):
    if file_uploaded is None:
        return None

    file_type = file_uploaded.type

    if file_type == "application/pdf":
        doc = fitz.open(stream=file_uploaded.read(), filetype="pdf")
        text = "\n".join([page.get_text("text") for page in doc])
        return text

    elif file_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        doc = docx.Document(file_uploaded)
        return "\n".join([para.text for para in doc.paragraphs])

    elif file_type.startswith("image/"):
        image = Image.open(io.BytesIO(file_uploaded.read()))
        return pytesseract.image_to_string(image)

    else:  # For text files
        return file_uploaded.read().decode("utf-8")

# Submit button
if st.button("Analyze Report"):
    if file_uploaded:
        extracted_text = extract_text(file_uploaded)

        if extracted_text:
            # Define AI prompt
            system_prompt = """
            You are a medical expert. Analyze the given medical report and provide insights.
            Key Responsibilities:
            1. **Identify abnormalities** in test results or diagnostic findings.
            2. **Summarize key findings** in simple language.
            3. **Provide possible causes and recommendations** based on the report.
            4. **Give next steps**, such as additional tests or consulting a specialist.

            Please provide the response in this structured format:
            - **Findings**
            - **Possible Causes**
            - **Recommendations**
            
            Always advise consulting a doctor before making health decisions.
            """

            prompt_parts = [system_prompt, extracted_text]

            with st.spinner("Analyzing your medical report..."):
                response = model.generate_content(prompt_parts)

            if response and response.text:
                st.subheader("📄 Medical Report Analysis")
                st.markdown(response.text)
            else:
                st.warning("⚠️ Unable to analyze the report. Please try again with a different file.")

        else:
            st.error("❌ Could not extract text. Ensure the file is clear and readable.")

    else:
        st.error("❌ Please upload a file before clicking Analyze.")
