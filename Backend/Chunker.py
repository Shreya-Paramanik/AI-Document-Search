from langchain_text_splitters import RecursiveCharacterTextSplitter


def spilt_text(text:str)->list[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size= 200,
        chunk_overlap= 20,
        separators = ["\n\n","\n","."," "])

    txt_chunk = splitter.split_text(text)

    return txt_chunk


