import { useReducer, useEffect } from "react";
import { useSelector } from "react-redux";

const initialState = {
  films: [],
  contacts: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        films: action.payload,
        contacts: action.payload,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        films: action.payload,
        contacts: action.payload,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const StateGetHook = (selector) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const data = useSelector(selector);

  useEffect(() => {
    if (data) {
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } else {
      dispatch({
        type: "FETCH_ERROR",
        payload:
          "Al momento non sono disponibili i dati richiesti, provare a reinserirli nel database e a riavviare l'applicativo",
      });
    }
  }, [data]);

  return state;
};

export default StateGetHook;
