import React from "react";
import  {useState} from 'react';
import Client from '../components/Client';
import Editor from '../components/editor';

export const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Vishal Singh" },
    
    { socketId: 2, username: "Vishal Singh Dhami" },

  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
    <div className="asideInner"></div>
        <div className="logo">
          <img className="logoImage" src="/code-sync.png" alt="logo" />
        </div>
        <h3>Connected</h3>
        <div className="clientList">
         {

          clients.map((client)=>(
             
             <Client 
              key ={client.socketId}username={client.username}/>

          )) 
         }
             </div>
      
      
      <button className="btn copyBtn ">Copy Room ID</button>
      <button className="btn leaveBtn">Leave</button>

      </div>
      <div className="editorWrap">
         <Editor/>

      </div>
    </div>
  );
};

export default EditorPage;
