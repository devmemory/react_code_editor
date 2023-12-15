import * as Babel from "@babel/standalone";
import { useEffect, useRef, useState } from "react";
import testString from "src/data/testString";

const useEditor = () => {
  const resultRef = useRef<HTMLIFrameElement>(null);

  const [text, setText] = useState<string>(testString);
  const [printText, setPrintText] = useState<string>();

  const debounce = useRef<number>();
  const isLoaded = useRef<boolean>(false);
  const currentScript = useRef<HTMLScriptElement>();

  useEffect(() => {
    initIframe();
    initConsole();

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    onChangeText();
  }, [text]);

  /** - append react, react dom, body entry tag */
  const initIframe = () => {
    const scripts = [
      {
        isLoaded: false,
        src: "https://unpkg.com/react@18/umd/react.production.min.js",
      },
      {
        isLoaded: false,
        src: "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
      },
    ];

    for (let i = 0; i < scripts.length; i++) {
      const script = document.createElement("script");
      script.src = scripts[i].src;
      script.defer = true;

      script.onload = () => {
        scripts[i].isLoaded = true;

        if (scripts.every((el) => el.isLoaded)) {
          isLoaded.current = true;
          buildScript();
        }
      };

      resultRef.current!.contentDocument!.head.appendChild(script);
    }

    const app = document.createElement("div");

    app.id = "app";

    resultRef.current!.contentDocument!.body.appendChild(app);
  };

  /** - post message from iframe and listen in parent */
  const initConsole = () => {
    const script = document.createElement("script");

    script.text = `
const originalLog = console.log;

console.log = (...args) => {
  parent.window.postMessage({ type: 'log', args: args }, '*')
  originalLog(...args)
}`.trim();

    resultRef.current!.contentDocument!.head.appendChild(script);

    window.addEventListener("message", onMessage);
  };

  /** - display console from iframe */
  const onMessage = (e: MessageEvent) => {
    const data = e.data;

    if (data.type === "log") {
      let args: string;

      if (typeof data.args === "object") {
        const value = JSON.stringify(data.args);

        // get rid of brace
        args = value.substring(1, value.length - 1);
      } else {
        args = data.args;
      }

      setPrintText(`${args}`);
    }
  };

  /** - debounce and build script */
  const onChangeText = () => {
    if (!isLoaded.current) {
      return;
    }

    clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      buildScript();
    }, 2000);
  };

  /** -transpile and append script */
  const buildScript = async () => {
    try {
      const convertedCode = Babel.transform(`${text}`, {
        presets: ["react"],
      }).code;

      const previousScript = currentScript.current;

      currentScript.current = document.createElement("script");

      currentScript.current.text = `${convertedCode}`;

      if (previousScript !== undefined) {
        previousScript.replaceWith(currentScript.current);
      } else {
        resultRef.current!.contentDocument!.head.appendChild(
          currentScript.current
        );
      }

      setPrintText(undefined);
    } catch (e) {
      if (currentScript.current !== undefined) {
        removeBody();
      }

      setPrintText(`Error : ${e}`);
    }
  };

  /** - remove previous element */
  const removeBody = () => {
    resultRef.current!.contentDocument!.body.children[0].innerHTML = "";
  };

  return { text, setText, printText, resultRef };
};

export default useEditor;
