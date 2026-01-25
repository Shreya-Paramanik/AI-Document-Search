import React from 'react';
import PdfViewer from './PdfViewer'
import './MidPanel.css';


 const MidPanel = ({file})=> {
  console.log("Mid",file);
  return (
    <div className='mid-panel'>
      <div className='mid-header'>
        <h1>Document Viewer</h1>
      </div>


      <div className='mid-body'>

        {!file ? (
          <div className='empty-space'>
            <p>No Document uploaded</p>
          </div>

        ):
        (
          <PdfViewer file={file}/>
        )}

      </div>
    </div>
  )
}
 
export default MidPanel
