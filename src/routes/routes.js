import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Readme from "../pages/Readme";
import Page404 from "../pages/Page404";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/readme" component={Readme} />

      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default Routes;
