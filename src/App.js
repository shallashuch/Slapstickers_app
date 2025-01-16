import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <div className="app-container">
            <img
              src={require("../src/assets/bandImg.jpeg").default}
              alt="description"
              className="band-icon top"
            />
            <Homepage />
            <img
              src={require("../src/assets/bandImg.jpeg").default}
              alt="description"
              className="band-icon bottom"
            />
          </div>
        </Switch>
        <Header />
      </Router>
    </div>
  );
}

export default App;
