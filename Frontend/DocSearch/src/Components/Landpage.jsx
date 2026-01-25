import React, { useState } from 'react'
import LeftPanel from './LeftPanel'
import MidPanel from './MidPanel'
import RightPanel from './RightPanel'
import axios from 'axios'


const LandPage = ()=> {

  const [pdf,setPdf] = useState(null);
  const [docId,setdocId] = useState("");
  const [document,setDocument] = useState([]);
  const [activeDoc,setActiveDoc] = useState("");

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
          file
        }

        
        setDocument(prev => [newDoc,...prev]);
        setActiveDoc(newDoc);

      } catch (error) {
        alert("Cannot upload file");
        console.log(error);
      }
      
   
  }

  const handleId =(id)=>{
     setdocId(id);
  }

  
  return (
    <div style={{display:'flex',justifyContent:'space-between',height:'100vh',width:'100vw'}}>
        <LeftPanel onSelectPDF = {handlepdf} documents = {document}/>

        {activeDoc? (<MidPanel file = {activeDoc}/>):<MidPanel/>}
        <RightPanel doc_id = {activeDoc.id}/>

    </div>
  )
}

export default LandPage
