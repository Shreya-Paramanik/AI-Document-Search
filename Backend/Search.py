import faiss
import numpy as np
from Embed import create_embed




def build_index(embeddings):
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index



def semantic_search(query : str,index,chunks,k):
    query_vector = create_embed([query])
    distance,i = index.search(query_vector, k)

    results = []

    for idx in i[0]:
        results.append(chunks[idx])

    return results


