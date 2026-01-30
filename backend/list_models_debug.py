import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY not found in backend/.env")
else:
    genai.configure(api_key=api_key)
    print("--- Available Gemini Models ---")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"Name: {m.name}")
                print(f"Display Name: {m.display_name}")
                print(f"Methods: {m.supported_generation_methods}")
                print("-" * 30)
    except Exception as e:
        print(f"Error: {e}")
