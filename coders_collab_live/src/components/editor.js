import React from "react";
import { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from '../Actions';

const Editor = () => {
   
  const editorRef= useRef(null);

  
  
  
  
  
  useEffect(() => {
        async function init() {
        Codemirror.fromTextArea(document.getElementById('realtimeEditor') , {
        mode: { name: 'javascript', json: true },
         theme: 'dracula' ,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        });

          


        editorRef.current.on('change', (instance, changes) => {
          const { origin } = changes;
          // const code = instance.getValue();
          // onCodeChange(code);
          // if (origin !== 'setValue') {
          //     socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          //         roomId,
          //         code,
          //     });
          // }
          console.log('changes',changes);
      });
            
        }
        init();
     }, []);
        



  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
