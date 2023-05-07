import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";
import Select from "react-select";
import axios from "axios";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
       // console.log(editorRef.current.getValue())
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
         // pass the updated code to onDataChange callback prop
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });

      // add event listener for keyup event to detect data changes
    
    }

    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
         
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);
  
  let oldCode=''
  
   // State variable to set users input
   const [userInput, setUserInput] = useState("");
 
   // State variable to set users output
   const [userOutput, setUserOutput] = useState("");
   const [userError, setUserError] = useState("");

  let compileBtn =()=>{
    oldCode=editorRef.current.getValue()
    console.log(oldCode)
    encodedParams.set('code', oldCode);
    compiledDataReqRes();
   }
  const languages = [
    { value: "js", label: "Javascript" },
    { value: "py", label: "Python" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },

  ];

  const encodedParams = new URLSearchParams();
  
  const setUserLang=(lng)=>{
   console.log(lng)
      encodedParams.set('language', lng);
  }
  
  const options = {
    method: 'POST',
    url: 'https://codex7.p.rapidapi.com/',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '05b1d046eee41bc3fbp145c80jsnd6e06103af69',
      'X-RapidAPI-Host': 'codex7.p.rapidapi.com'
    },
    data: encodedParams,
  };
  const compiledDataReqRes=async()=>{
  try {
      const response = await axios.request(options);
      console.log(response.data);
      setUserOutput(response.data.output);
      if(response.data.error){
        setUserError(response.data.error)
      }
  } catch (error) {
      console.error(error);
      
  }
  }
const clearOutput=()=>{
    setUserOutput('');
}
const clearError=()=>{
    setUserError('');
}

  return (
    <div>
      <div className="navbar">
        <h6> Language Options</h6>
        <div className="lang">
          <Select
            options={languages} 
            onChange={(e) => setUserLang(e.value)}
          />
        </div>
        <button className="compBtn" onClick={compileBtn}>Compile</button>
      </div>
      <textarea id="realtimeEditor"></textarea>

      <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea id="code-inp" 
            // onChange=
            //   {(e) => setUserInput(e.target.value)}
            >
            </textarea>
          </div>
          <h4>Output:</h4>
          {false ? (
            <div className="spinner-box">
              {/* <img src={spinner} alt="Loading..." /> */}
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button 
              onClick={() => { clearOutput() }}
                 className="clear-btn">
                 Clear
              </button>
            </div>
          )}
           <h4>Errors:</h4>
          <div className="output-box">
           <pre>{userError}</pre>
           <button 
              onClick={() => { clearError() }}
                 className="clear-btn">
                 Clear
              </button>
          </div>
        </div>


    </div>
  );
};

export default Editor;
