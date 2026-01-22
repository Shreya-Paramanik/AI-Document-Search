import React, { useState } from 'react'
import LeftPanel from './LeftPanel'
import MidPanel from './MidPanel'
import RightPanel from './RightPanel'


const LandPage = ()=> {

  const [pdf,setPdf] = useState(null);
  const [docId,setdocId] = useState("");

  const handlepdf =(file)=>
  {
    console.log("Landpage received ",file);
    setPdf(file);
   
    console.log(pdf);
  }

  const handleId =(id)=>{
     setdocId(id);
  }

  
  return (
    <div style={{display:'flex',justifyContent:'space-between',height:'100vh',width:'100vw'}}>
        <LeftPanel onSelectPDF = {handlepdf} Getid = {handleId}/>

        {pdf? (<MidPanel file = {pdf}/>):<MidPanel/>}
        <RightPanel doc_id = {docId}/>

    </div>
  )
}

export default LandPage
