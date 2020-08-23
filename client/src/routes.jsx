import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/index";
import { Home, Register,Login } from "./screens/index";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default Router;
