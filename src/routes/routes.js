import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Readme from "../pages/Readme";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/readme" component={Readme} />
    </Switch>
  );
};

export default Routes;
