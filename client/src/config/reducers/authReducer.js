import { AuthConstants } from "../constants/authConstants";
import Axios from "../Helpers/Axios";
import { toast } from "react-toastify";

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
    case AuthConstants.REGISTER_SUCCESS:
      //set token in localstorage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AuthConstants.REGISTER_FAIL:
      //remove token in localstorage
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}

//actions
export const register = ({ name, email, password }) => async (dispatch) => {
  //config header for axios
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //set Body
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await Axios.post("/user/register", body, config);
    dispatch({
      type: AuthConstants.REGISTER_SUCCESS,
      payload: res.data,
    });
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
