import React from 'react'

type ResultProps = {
  ref: HTMLDivElement;
};

const Result = React.forwardRef<HTMLDivElement, ResultProps>(({}, ref) => {
  return <div ref={ref} />;
});

export default Result