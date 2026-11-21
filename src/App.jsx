import React from "react";
import "./App.css";
import Tracker from "./components/Tracker";
import CurrentTime from "./components/CurrentTime";

function App() {
  return (
    <div>
      <h1>Logic Tracker</h1>
      <CurrentTime />
      <Tracker />
    </div>
  );
}

export default App;
