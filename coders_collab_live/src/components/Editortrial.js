// import React,{ useRef, useEffect } from "react";

// import { EditorState ,Text,EditorSelection} from '@codemirror/state';
// import { EditorView, keymap ,gutter} from '@codemirror/view';
// import { defaultKeymap , indentWithTab} from '@codemirror/commands';
// import { javascript } from '@codemirror/lang-javascript';
// import { oneDark } from '@codemirror/theme-one-dark';


//  const Editortrial = () => {
//     const editor = useRef();

//     useEffect(() => {
//         const startState = EditorState.create({
//           doc: 'Hello World',
          
   
          
          
          
//           extensions: [keymap.of([defaultKeymap, indentWithTab]),
//         oneDark,
//          javascript(),
//         ],
//         });

//         const view = new EditorView({ 
//           state: startState, 
//           parent: editor.current });

      
//         return () => {
//           view.destroy();
//         };
//     }, []);

//     return <div ref={editor}></div>;
// }
// export default Editortrial