import { AuthConstants } from "../constants/authConstants";
import Axios from "../Helpers/Axios";
import { toast } from "react-toastify";
import setAuthToken from '../Helpers/setAuthToken'

//initial state
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

//reducers
export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(action);
  switch (type) {
    case AuthConstants.USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case AuthConstants.REGISTER_SUCCESS:
    case AuthConstants.LOGIN_SUCCESS:  
      //set token in localstorage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AuthConstants.SET_LOADING:
      return {
        ...state,
        loading:true
      }
    case AuthConstants.REGISTER_FAIL:
    case AuthConstants.LOGIN_FAIL:  
    case AuthConstants.AUTH_ERROR:
    case AuthConstants.LOGOUT:
      //remove token in localstorage
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user:null
      };

    default:
      return state;
  }
}

//actions
export const loadUser = () => async (dispatch) => {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }
  try {
    const res = await Axios.get("/user");
    dispatch({
      type: AuthConstants.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response, "response error");
    dispatch({
      type: AuthConstants.AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  //config header for axios
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //set Body
  const body = JSON.stringify({ name, email, password });
  dispatch({
    type:AuthConstants.SET_LOADING
  })
  try {
    const res = await Axios.post("/user/register", body, config);
    dispatch({
      type: AuthConstants.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser())
  } catch (error) {
    console.log(error);
    const errors = error.response.data.error;
    if (errors) {
      toast.error(errors);
    }
    dispatch({
      type: AuthConstants.REGISTER_FAIL,
    });
  }
};


export const login = ({ email, password }) => async (dispatch) => {
  //config header for axios
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //set Body
  const body = JSON.stringify({ email, password });
  dispatch({
    type:AuthConstants.SET_LOADING
  })
  try {
    const res = await Axios.post("/user/login", body, config);
    dispatch({
      type: AuthConstants.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser())
  } catch (error) {
    console.log(error);
    const errors = error.response.data.error;
    if (errors) {
      toast.error(errors);
    }
    dispatch({
      type: AuthConstants.LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: AuthConstants.LOGOUT,
  });
};
