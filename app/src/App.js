import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import RegisterPass from "./RegisterPass";
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
                  {/*<Route exact path="/" exact component={() => <Home drizzle={drizzle} drizzleState={drizzleState}/>}/> */}
                  <Route exact path="/register" component={() => <RegisterPass drizzle={drizzle} drizzleState={drizzleState}/>}/>
                </Switch>
                <Home drizzle={drizzle} drizzleState={drizzleState}/>
              </Router>
            )
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
  );
}