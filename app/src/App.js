import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Vaccine from "./Vaccine";
import Sensors from "./Sensors";
import Settings from "./Settings";
import Navigation from './Navigation';

const drizzle = new Drizzle(drizzleOptions);

export default () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return "Loading..."
          }

          return (
            <Router>
              <Navigation />
              <Switch>
                <Route exact path="/" render={() => {
                  return <Home drizzle={drizzle} drizzleState={drizzleState} />
                }} />
                <Route exact path="/vaccine" component={() => <Vaccine drizzle={drizzle} drizzleState={drizzleState} />}/>
                <Route exact path="/sensors" component={() => <Sensors drizzle={drizzle} drizzleState={drizzleState} />} />
                <Route exact path="/settings" component={() => <Settings drizzle={drizzle} drizzleState={drizzleState} />} />
              </Switch>
            </Router>

          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}