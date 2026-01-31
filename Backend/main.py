from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid
import os

from starlette.staticfiles import StaticFiles

from PdfLoader import read_pdf
from Search import semantic_search,build_index
from Chunker import spilt_text
from Embed import create_embed
from llm import gen_result


app = FastAPI()

os.makedirs("files", exist_ok=True)
app.mount("/files", StaticFiles(directory="files"),name="files")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
indexes = {}
chunks_store = {}
#

@app.get("/debug")
def debug_files():
    import os
    return os.listdir("files")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    #
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400,detail="File type not supported")

    doc_id = str(uuid.uuid4())


    content = await file.read()


    file_path = f"files/{doc_id}.pdf"

    with open(file_path, "wb") as f:
        f.write(content)

    if not content:
        raise HTTPException(status_code=404, detail="File not found")
    data = read_pdf(content)
    chunks = spilt_text(data)
    vector = create_embed(chunks)
    index = build_index(vector)


    indexes[doc_id] = index
    chunks_store[doc_id] = chunks

    return {"id": doc_id,
            "pdfUrl": f"http://127.0.0.1:8000/files/{doc_id}.pdf"}

#
@app.post("/search")
def search(doc_id : str,query: str):
    if doc_id not in indexes:
        raise HTTPException(status_code=404, detail="Document not found")

    index = indexes[doc_id]
    chunks = chunks_store[doc_id]

    results = semantic_search(query,index, chunks,k =10)
    context = "\n".join(results)

    answer = gen_result(context, query)

    return {"answer": answer,
            "context": results
            }


#
# @app.post("/search")
# async def search(file: UploadFile = File(...),question: str = ""):
#     content = await file.read()
#
#     text = read_pdf(content)
#     chunk = spilt_text(text)
#
#     embedding = create_embed(chunk)
#     index = build_index(embedding)
#
#     results = semantic_search(question, index, chunk, k=3)
#     context = "\n".join(results)
#
#     answer = generate_answer(context, question)
#
#     return {"answer": answer,
#             "context": results
#             }







