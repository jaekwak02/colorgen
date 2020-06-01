import React from "react";

import "normalize.css";
import "./transitions.css";
import "./App.css";

import HomePage from "../pages/HomePage";
import NotificationManager from "../project/NotificationManager";

function App() {
  return (
    <NotificationManager>
      <HomePage />
    </NotificationManager>
  );
}

export default App;
