import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import HomeClient from "./HomeClient/HomeClient";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/client" component={HomeClient} />
      </Switch>
    </Router>
  );
};

export default App;
