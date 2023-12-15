import * as Babel from "@babel/standalone";
import React, { useEffect, useRef, useState } from "react";
import { Root, createRoot } from "react-dom/client";
import testString from "src/data/testString";

const useTest = () => {
  const resultRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState<string>(testString);
  const [printText, setPrintText] = useState<string>();

  const root = useRef<Root>();
  const debounce = useRef<number>();

  useEffect(() => {
    root.current = createRoot(resultRef.current!);

    const originalConsoleLog = initConsole();

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  useEffect(() => {
    onChangeText();
  }, [text]);

  /** - debounce and build script */
  const onChangeText = () => {
    clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      buildScript();
    }, 2000);
  };

  /** -transpile and append script */
  const buildScript = async () => {
    try {
      let convertedCode = Babel.transform(`${text}`, {
        presets: ["react"],
      }).code;

      console.log({ convertedCode });

      convertedCode = convertedCode?.replace('"use strict";', "").trim();
      const func = new Function("React", `return ${convertedCode}`);
      const App = func(React);

      root.current!.render(<App />);
      setPrintText(undefined);
    } catch (e) {
      setPrintText(`Error : ${e}`);
    }
  };

  /** - initial setting to show console to jsx */
  const initConsole = () => {
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      originalConsoleLog(...args);

      const log = JSON.stringify(args);

      setPrintText(log.substring(1, log.length - 1));
    };

    return originalConsoleLog;
  };

  return { text, setText, printText, resultRef };
};

export default useTest;
