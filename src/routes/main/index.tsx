import React from "react";
import { useNavigate } from "react-router-dom";
import { routeName } from "src/utils/routeUtil";
import styles from "./main.module.css";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.div_main}>
      <h1>Select type</h1>
      <div>
        <button onClick={() => navigate(routeName.editor)}>Editor</button>
        <button onClick={() => navigate(routeName.test)}>Test</button>
      </div>
    </div>
  );
};

export default Main;
