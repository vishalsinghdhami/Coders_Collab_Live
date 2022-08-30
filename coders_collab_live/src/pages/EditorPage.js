import React from "react";
import { useEffect,useState,useRef } from "react";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { useLocation } from "react-router-dom";


export const EditorPage = () => {
  const socketRef =useRef(null);
  const location =useLocation();
  useEffect(()=>{
      const init =async()=>{
        socketRef.current =await initSocket();
        // socketRef.current.emit(ACTIONS.JOIN,{
        //     roomId,
        //     username: location.state?.username,

        // });
      };
     init();       
  },[]);



  const [clients, setClients] = useState([
    { socketId: 1, username: "Vishal Singh" },
    { socketId: 2, username: "Vishal Singh Dhami" },
    { socketId: 3, username: "Vishal " },

  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
        <div className="logo">
          <img className="logoImage" src="/code-sync.png" alt="logo" />
        </div>
        <h3>Connected</h3>
        <div className="clientList">
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>
         </div>
        <button className="btn copyBtn ">Copy Room ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
