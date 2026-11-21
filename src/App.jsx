import React from "react";
import "./App.scss";
import Tracker from "./components/Tracker";
import CurrentTime from "./components/CurrentTime";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-eyebrow">Daily attendance</p>
        <h1>Login Tracker</h1>
        <p className="app-description">
          Keep a simple record of your login and logout times.
        </p>
      </header>
      <CurrentTime />
      <Tracker />
    </main>
  );
}

export default App;
