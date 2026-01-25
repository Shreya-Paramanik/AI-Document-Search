import { useState } from 'react';
import {Document,Page} from 'react-pdf';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import "./MidPanel.css";


const PdfViewer = ({file}) =>{

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom,setZoom] = useState(1); 

  const onDocumentLoadSuccess = ({numPages}) =>{
    setNumPages(numPages);
    setPageNumber(1);
  }

  const nextPage = () =>{
    setPageNumber((prev) => (prev<numPages? prev+1:prev));
  }

  
  const PrevPage = () =>{
    
    setPageNumber((prev) => (prev>1? prev-1:prev));
  }
  

  
  return (
    <div className='pdf-viewer'>

      <div className='pdf-toolbar'>
          <button className='btn btn-lg btn-primary px-4' 
            onClick={PrevPage}
            disabled={pageNumber === 1}>
            Prev
          </button>

          <span className='page-indicator'>Page {pageNumber}/{numPages}</span>

          <button className='btn btn-lg btn-primary px-4' onClick={nextPage}>
            Next
          </button>

        </div>
      <Document file= {file?.file} 
      onLoadSuccess={onDocumentLoadSuccess}>
        <Page className="react-pdf__Page" pageNumber={pageNumber}
        width={600 * zoom}
        renderAnnotationLayer={true}
        renderTextLayer={true}
        
        />
      </Document>
      

      



      {numPages &&
      (
        

        <div className='zoom-slider-wrapper'>
        <input
          type='range'
          min={0.5}
          max={2}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="zoom-slider"
        />

        <span className='zoom-label'>{Math.round(zoom * 100)}%</span>
      </div>

        )}


        
      
      
    </div>
  );
    

    
}

export default PdfViewer;