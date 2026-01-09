import React from 'react'
import "./LeftPanel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineCloudUpload } from "react-icons/ai";


const LeftPanel = ({onSelectPDF})=> {


   const handleFileChange = (event) =>
   {
     

     const file = event.target.files[0];

     console.log("Selected file",file);
     if(!file)return;

     if(file.type !== "application/pdf")
     {
      alert("Only Pdf");
      return;
     }

     onSelectPDF(file);

  }

   
  return (
    <div style={{height:'100%',width:'20%',backgroundColor:'#5078b0'}}>

        <h1 style={{marginLeft:'50px',marginTop:'20px'}}>History</h1>
        <div className="card text-center mb-3 my-div" style= {{width: "20rem",height:'18rem',backgroundColor:'#5078b0',border:'5px dotted white'}}>
        <div className="card-body my-div2">
          <AiOutlineCloudUpload size={100} color={'white'}style={{display:'block', marginLeft:'35%'}}/>

        <input type= 'file' accept = 'application/pdf'className="btn btn-primary my-link" style={{fontSize:'25px'}} placeholder='Upload PDF' onChange={handleFileChange}/>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
