import React from "react";
import useCodeAera from "src/hooks/useCodeArea";
import styles from "./code.module.css";

type CodeProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const Code = ({ text, setText }: CodeProps) => {
  const { textareaRef, preRef, getCode, onKeyDown, onScroll } = useCodeAera(
    text,
    setText
  );

  return (
    <div className={styles.div_code}>
      <div>index.jsx</div>
      <textarea
        ref={textareaRef}
        onKeyDown={onKeyDown}
        value={text}
        spellCheck={false}
        autoComplete="false"
        onScroll={onScroll}
        onChange={(e) => setText(e.target.value)}
      />
      <pre ref={preRef}>
        <code className="language-jsx" dangerouslySetInnerHTML={getCode()} />
      </pre>
    </div>
  );
};

export default Code;
