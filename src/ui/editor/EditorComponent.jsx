import ReactQuill, { Quill } from "react-quill";
import QuillResizeImage from "quill-resize-image";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import "./stylesEditor.css";

Quill.register("modules/resize", QuillResizeImage);

export const EditorComponent = () => {
  const [state, setState] = useState({ value: null });

  const handleChange = (value) => {
    setState({ value });
    console.log(state);
  };
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={{
          ...modules,
          // resize: {},
        }}
        formats={[...formats, "image"]}
      />
      <button onClick={handleChange}>CHANGE</button>
    </div>
  );
};

export default EditorComponent;
