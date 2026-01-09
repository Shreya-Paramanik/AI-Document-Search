from pypdf import PdfReader
from io import BytesIO






# Extract Text -> Create Chunks -> Create Embeds(Vector) ->
# Store in Vector db -> Get the question ->Convert into embed ->
# Perform Semantic Search -> Call LLM -> Result


def read_pdf(pdf_bytes : bytes)-> str:
    reader = PdfReader(BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        if page.extract_text():
            text += page.extract_text()

    return text


# data = read_pdf()
# chunks = spilt_text(data)
# vector = create_embed(chunks)
#
# dimension = vector.shape[1]
# index = faiss.IndexFlatL2(dimension)
# store_vector(vector, index)

#
# query = "What skills does this person have?"
#
# results = semantic_search(query,index,chunks,k=3)
# prompt = ("You are a helpful assistant.Use only the information provided below. If the answer is not present, say I dont Know."
#           " Context : ")
#
#
# for result in results:
#     prompt += result
#     prompt += "\n"
#
# print(prompt)
# prompt = prompt + "Question :" + query + "Answer concisely."




