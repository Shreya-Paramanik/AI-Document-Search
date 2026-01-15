import { useState } from 'react';
import {Document,Page} from 'react-pdf';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import "./MidPanel.css";


const PdfViewer = ({file}) =>{

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
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
    <div className='viewer_div'>
      <Document file= {file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber}
        renderAnnotationLayer={true}
        renderTextLayer={true}
        
        />
      </Document>
      
      <div className='d-flex align-items center justify-content center mt-2'>
        <button className = 'btn btn-primary btn-lg mt-4 shadow' onClick={PrevPage} disabled = {pageNumber<=1}>
          Prev
        </button>

        <p className='mb-0 text-center flex-grow-1 fs-5'>Page {pageNumber} of {numPages} pages</p>

        <button className='btn btn-primary btn-lg mt-4 shadow' onClick={nextPage} disabled = {pageNumber >= numPages}>
          Next
        </button>

        
      </div>

    </div>
  );
    

    
}

export default PdfViewer;