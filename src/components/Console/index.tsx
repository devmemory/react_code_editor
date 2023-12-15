import React from "react";

const Console = ({ printText }: { printText?: string }) => {
  return <div>{printText ?? "console.log will be printed here."}</div>;
};

export default Console;
