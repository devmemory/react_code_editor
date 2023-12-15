import React from "react";

type ResultProps = {
  ref: HTMLIFrameElement;
};

const Result = React.forwardRef<HTMLIFrameElement, ResultProps>(({}, ref) => {
  return <iframe ref={ref} />;
});

export default Result;
