import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Options from "./Options";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/options">
          <Options />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
