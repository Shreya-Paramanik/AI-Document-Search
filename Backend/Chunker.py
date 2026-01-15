from langchain_text_splitters import RecursiveCharacterTextSplitter


def spilt_text(text:str)->list[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size= 600,
        chunk_overlap= 100,
        separators = ["\n\n","\n.","\n-","."," "])

    txt_chunk = splitter.split_text(text)

    return txt_chunk


