import React from 'react'
import "./LeftPanel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from 'axios';


const LeftPanel = ({onSelectPDF,Getid})=> {


   const handleFileChange = async (event) =>
   {
     
      const file = event.target.files[0];
      if(!file) return;

      if(file.type !== "application/pdf")
      {
        alert("Only PDF allowed");
        return;
      }

      const formData = new FormData();
      formData.append("file",file);


      try {
        const response = await axios.post('http://127.0.0.1:8000/upload',
          formData
        );

        console.log(response.data.id);
        Getid(response.data.id);
      } catch (error) {
        alert("Cannot upload file");
        console.log(error);
      }


     onSelectPDF(file);
     

  }

   
  return (
    <div style={{height:'100%',width:'20%',backgroundColor:'#5078b0'}}>

        <h1 style={{marginLeft:'50px',marginTop:'20px'}}>History</h1>
        <div className="card text-center mb-3 my-div" style= {{width:'80%',backgroundColor:'#5078b0',border:'5px dotted white'}}>
            <div className="card-body my-div2">
              <AiOutlineCloudUpload size={100} color={'white'}style={{display:'block', marginLeft:'35%'}}/>

              <label htmlFor = "pdfuploaded" className='btn btn-primary shadow lg px-5 py-4 mt-5 fs-4'>Upload Pdf</label>
              <input type= 'file' accept = 'application/pdf'id='pdfuploaded' style={{fontSize:'25px'}} onChange={handleFileChange} hidden/>
            </div>
      </div>
    </div>
  )
}

export default LeftPanel
