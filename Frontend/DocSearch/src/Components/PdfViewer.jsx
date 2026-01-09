import { useState } from 'react';
import {Document,Page} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


const PdfViewer = ({file}) =>{

    console.log("PDF RECEIVED",file);
        const [numPage,setnumPage] = useState(null);
 

     if (!file)
     {
        return <p>No PDF selected</p>
     }

        return(
        <div style={{height:'100%', overflow:'auto'}}>
            <Document
            
            file={file}
            onLoadSuccess={({numPage}) =>
            setnumPage(numPage)}
            loading = {<p>Loading Pdf...</p>}
            error = {<p>FAILED TO LOAD PDF</p>}>


            {Array.from({length:numPage},(_,index) =>(

                <div key={index} id={`page ${index + 1}`}>
                    <Page
                    pageNumber={index+1}
                    scale={1.4}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    />
                </div>
            ))}
            </Document>
        </div>   
        )
}

export default PdfViewer;