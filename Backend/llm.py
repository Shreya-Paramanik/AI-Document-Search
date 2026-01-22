import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

def gen_result(context : str, query : str)->str:
    prompt = f"""
        you are a factual question-answering system.

        Answer ONLY using the context below.
        If the answer is not explicitly present, reply:
        "Not Mentioned in the document."
        Context: {context}
        Question: {query}
        """
    response = client.models.generate_content(

        model="gemini-flash-latest",
        contents= prompt)

    return response.text