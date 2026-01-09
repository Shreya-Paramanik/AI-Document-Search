import React from 'react';
import PdfViewer from './PdfViewer'


 const MidPanel = ({file})=> {
  console.log("Mid",file);
  return (
    <div style={{height:'100%',width:'50%',backgroundColor:'#f5f8fdff'}}>
        <h1>View Here</h1>
        <PdfViewer file={file}/>

    </div>
  )
}

export default MidPanel
