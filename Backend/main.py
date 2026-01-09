from fastapi import FastAPI, File, UploadFile, HTTPException
from PdfLoader import read_pdf
from Search import semantic_search,build_index
from Chunker import spilt_text
from Embed import create_embed



app = FastAPI()

indexes = {}
chunks_store = {}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()

    if not content:
        raise HTTPException(status_code=404, detail="File not found")
    data = read_pdf(content)
    chunks = spilt_text(data)
    vector = create_embed(chunks)
    index = build_index(vector)

    doc_id = file.filename
    indexes[doc_id] = index
    chunks_store[doc_id] = chunks

    return {"id": doc_id}


@app.post("/search")
def search(doc_id : str,query: str):
    if doc_id not in indexes:
        raise HTTPException(status_code=404, detail="Document not found")

    index = indexes[doc_id]
    chunks = chunks_store[doc_id]

    results = semantic_search(query,index, chunks,k =3)

    return {"results": results}




