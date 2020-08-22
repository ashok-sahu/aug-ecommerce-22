import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/index";
import { Home, Register } from "./screens/index";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
