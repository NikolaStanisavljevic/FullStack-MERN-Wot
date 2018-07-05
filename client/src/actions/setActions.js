import { SET_STATS } from "./types";
import axios from "axios";

export function setStats() {
  return function(dispatch) {
    axios
      .get(
        "api/items"
      )
      .then(res => {
        dispatch({
          type: SET_STATS,
          payload: res.data
        });
      });
  };
}
