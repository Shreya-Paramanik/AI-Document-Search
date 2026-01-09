from sentence_transformers import SentenceTransformer
import numpy as np



model = None

def get_model():
    global model
    if model is None:
        model = SentenceTransformer('all-MiniLM-L6-v2')
    return model


def create_embed(chunk : list[str])->np.ndarray:
    model = get_model()
    vector = model.encode(chunk)

    return vector.astype('float32')