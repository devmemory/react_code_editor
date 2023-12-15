import React from "react";
import Result from "./components/Result";
import styles from "./components/editor.module.css";
import useEditor from "src/hooks/useEditor";
import Code from "src/components/Code";
import Console from "src/components/Console";

const Editor = () => {
  const { text, setText, resultRef, printText } = useEditor();

  return (
    <div className={styles.div_editor}>
      <Code text={text} setText={setText} />
      <div>
        <Result ref={resultRef} />
        <Console printText={printText} />
      </div>
    </div>
  );
};

export default Editor;
