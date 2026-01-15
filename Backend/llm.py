from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

MODEL_NAME = "google/flan-t5-small"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

def generate_answer(context : str,question : str)->str:
    prompt = f"""
    you are a factual question-answering system.
    
    Answer ONLY using the context below.
    If the answer is not explicitly present, reply:
    "Not Mentioned in the document."
    Context: {context}
    Question: {question}
    Answer: 
    """

    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)

    with torch.no_grad():
        outputs = model.generate(**inputs,max_new_tokens = 80)

    return tokenizer.decode(outputs[0], skip_special_tokens=True)