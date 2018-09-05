import { ACTION_ADD_MARKER } from "@store/action-types";

export const addMarker = (newData) => {
  return {
    payload: newData,
    type: ACTION_ADD_MARKER,
  }
}