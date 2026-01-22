import React, { useEffect, useRef, useState } from 'react'
import "./RightPanel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

 const RightPanel = ({doc_id})=> {

  const [messages,setMessages] = useState([]);
  const [input,setInput] = useState("");
  const bottomRef = useRef(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior:"smooth"
    }),[messages]});



  const handleSend = async() => {
    console.log("Send");

    const question = input.trim();
    if(!question) return;

    console.log(question);
    // if(!documentId)
    // {
    //   alert("Upload a PDF first");
    //    return;
    // }

    setMessages((prev) =>[...prev,{role:"user",content: question}]);
    setInput("");

    try{
      // console.log(doc_id,question);
      const response = await axios.post("http://127.0.0.1:8000/search",null,{
        params:{
          doc_id : doc_id,
          query : question
        }
      });

      console.log(response);

      setMessages((prev) =>[
        ...prev,{role:"bot",content:response.data.answer},
      ]);
    }catch(error)
    {
      console.log(error);


      setMessages((prev) =>[...prev,{role:"bot",content:"Can't find results"}]);
    }
  };
  
  const handleKeyDown = (e) =>{
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      handleSend();
    }
  };
  

  return (
    <div className='r-div' style={{height:'100%',width:'30%',backgroundColor:'#eef3f0ff'}}>

      <h1 className='mt-4 ms-5'>Search Here</h1>
        <div className='chat-window'>

          {messages.length === 0 &&(
            <div className='empty-state'>
              Ask Qusetions about the uploaded document
            </div>
          )}

          {messages.map((msg,index) => (
            <div key={index} className={`d-flex mb-2 ${msg.role === "user"?"justify-content-end":"justify-content-start"}`}>
            
              <div className={`px-3 py-4 rounded fs-5 ${msg.role === "user"? "bg-primary text-white":"bg-success text-dark border"}`} 
              style={{maxWidth:"70%"}}>
                {msg.content}
              </div> 
            </div>
          ))}

          <div ref={bottomRef}></div>
        </div>

        <div className='input-group input-area'>
          <input className=' form-control px-5 py-4 fs-4'
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Ask something about the document...'/>

          <button onClick={handleSend} className='btn btn-primary btn-lg ms-3 px-4 fs-4'>Send</button>
        </div>
      

        

    </div>
  )
}

export default RightPanel
