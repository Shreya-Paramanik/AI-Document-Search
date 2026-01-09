import React, { useState } from 'react'
import LeftPanel from './LeftPanel'
import MidPanel from './MidPanel'
import RightPanel from './RightPanel'


const LandPage = ()=> {

  const [pdf,setPdf] = useState(null);

  const handlepdf =(file)=>
  {
    console.log("Landpage received ",file);
    setPdf(file);
  }

  console.log(pdf);
  return (
    <div style={{display:'flex',justifyContent:'space-between',height:'100vh',width:'100vw'}}>
        <LeftPanel onSelectPDF = {handlepdf}/>

        {pdf? (<MidPanel file = {pdf}/>):(alert("Select a pdf"))}
        <RightPanel/>

    </div>
  )
}

export default LandPage
