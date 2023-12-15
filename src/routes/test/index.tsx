import React from "react";
import Code from "src/components/Code";
import Console from "src/components/Console";
import Result from "./components/Result";
import styles from "./components/test.module.css";
import useTest from "src/hooks/useTest";

const Test = () => {
  const { text, setText, printText, resultRef } = useTest();

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

export default Test;
