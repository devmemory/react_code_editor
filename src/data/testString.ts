const testString = `
function Component() {
  const [counter, setCounter] = React.useState(1);
  const [title, setTitle] = React.useState()
  const debounce = React.useRef()

  React.useEffect(() => {
    clearTimeout(debounce.current)

    debounce.current = setTimeout(() => {
      getTitle();
    }, 1000);
  },[counter])

  const getTitle = async () => {
    // const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + counter)

    // const data = await res.json()

    // setTitle(data.title)
  }

  const increase = () => {
    setCounter(counter + 1);
  };

  const decrease = () => {
    setCounter(counter - 1);
  };

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <div style={{textAlign: "center"}}>
        {title} <br/>
        {counter}
      </div>
      <div style={{display: "flex"}}>
        <button onClick={increase}>+</button>
        <div style={{width: "20px"}}/>
        <button onClick={decrease}>-</button>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<Component />)
`.trim();

export default testString;
