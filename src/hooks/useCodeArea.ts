import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-okaidia.min.css";
import { KeyboardEvent, UIEvent, useEffect, useRef } from "react";

const useCodeAera = (
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>
) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [text]);

  /** - tab key and string quote feature */
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Tab") {
      handleTab(e);
    }

    if (e.code === "Quote") {
      handleQuote(e);
    }
  };

  /** - add tab and move cursor */
  const handleTab = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const { start, end, hasStartEnd } = checkTarget(e);

    if (hasStartEnd) {
      const value = text.substring(0, start) + "\t" + text.substring(end);

      setText(value);

      resetCursur(start);
    }
  };

  /** - add quote string and move cursur */
  const handleQuote = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const { start, end, hasStartEnd } = checkTarget(e);

    if (hasStartEnd) {
      e.preventDefault();
      const selected = text.substring(start, end);

      const startText = text.substring(0, start);
      const endText = text.substring(end);

      const shift = e.shiftKey;

      const quote = shift ? '"' : "'";

      const value =
        selected.startsWith(quote) && selected.endsWith(quote)
          ? startText + selected.replaceAll(quote, "") + endText
          : startText + quote + `${selected}` + quote + endText;

      setText(value);

      resetCursur(start);
    }
  };

  /** - target text start, end location */
  const checkTarget = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    const hasStartEnd = start !== null && end !== null;

    return { start, end, hasStartEnd };
  };

  /** - move to changed cursur location */
  const resetCursur = (start: number) => {
    const timeOut = setTimeout(() => {
      textareaRef.current!.setSelectionRange(start + 1, start + 1);

      clearTimeout(timeOut);
    }, 100);
  };

  /** - synchronize text editor and prism */
  const onScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;

    preRef.current!.scrollTop = target.scrollTop;
    preRef.current!.scrollLeft = target.scrollLeft;
  };

  /** - js string to jsx string */
  const getCode = () => {
    const __html = text
      .replace(new RegExp("&", "g"), "&amp;")
      .replace(new RegExp("<", "g"), "&lt;");

    return { __html };
  };

  return { textareaRef, preRef, getCode, onKeyDown, onScroll };
};

export default useCodeAera;
