import React, { useEffect, useState } from 'react'
import LeftPanel from './LeftPanel'
import MidPanel from './MidPanel'
import RightPanel from './RightPanel'
import axios from 'axios'


const LandPage = ()=> {

  const [pdf,setPdf] = useState(null);
  const [docId,setdocId] = useState("");
  const [activeDoc,setActiveDoc] = useState("");
  const [messages,setMessages] = useState([]);

  const [document,setDocument] = useState(()=>{
    const saved = localStorage.getItem("documents");
    return saved ? JSON.parse(saved) : [];

   
  })


  useEffect(()=>{
    localStorage.setItem("documents",
      JSON.stringify(document));
    
      
  },[document]);
  

  useEffect(() =>
  {
    if(!activeDoc){
     setMessages([]);
     return;}
    


     setMessages(activeDoc.chats || []);
     console.log(messages);
  },[activeDoc])

  const handlepdf = async(file)=>
  {
    // console.log("Landpage received ",file);
    
      const formData = new FormData();
      formData.append("file",file);

    try {
        const response = await axios.post('http://127.0.0.1:8000/upload',
          formData
        );

        const newDoc = { 
          id: response.data.id,
          name: file.name,
          uploadAt: new Date().toISOString(),
          pdfUrl :response.data.pdfUrl,
          chats:[]
        }

        setDocument(prev => [newDoc,...prev]);

        
        // setDocument(prev => [newDoc,...prev]);
        setActiveDoc(newDoc);

      } catch (error) {
        alert("Cannot upload file");
        console.log(error);
      }


      
      
   
  }

  const handleId =(id)=>{
     setdocId(id);
  }

  const addtoChat = (doc_id,role,content) => {
    // alert("Added to chat");
      setDocument(prev => prev.map(doc => 
        doc.id === doc_id?
        {...doc,chats:[...doc.chats,{role,content}]}:doc
      ));

      
    
      console.log(document);
    }


    const passFile = (file) =>{
        console.log(file); 
        setActiveDoc(file);

    }

  
  return (
    <div style={{display:'flex',justifyContent:'space-between',height:'100vh',width:'100vw'}}>
        <LeftPanel onSelectPDF = {handlepdf} documents = {document} passFile = {passFile}/>

        {activeDoc? (<MidPanel file = {activeDoc}/>):<MidPanel/>}
        <RightPanel doc_id = {activeDoc.id} messages = {messages} setMessages= {setMessages} addtoChat = {addtoChat}/>

    </div>
  )
}

export default LandPage
