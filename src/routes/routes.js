import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Readme from "../pages/Readme";
import MyAlbum from "../pages/MyAlbum";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/readme" component={Readme} />
      <Route path="/myalbum" component={MyAlbum} />
    </Switch>
  );
};

export default Routes;
