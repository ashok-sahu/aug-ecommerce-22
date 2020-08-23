import React,{useEffect} from "react";
import { Provider } from "react-redux";
import Router from "./routes";
import store from "./config/store/store";
import setAuthToken from './config/Helpers/setAuthToken'
import { loadUser } from "./config/reducers/authReducer";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
