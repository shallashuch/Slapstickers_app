import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Readme from "./pages/Readme";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/readme" exact component={Readme} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
