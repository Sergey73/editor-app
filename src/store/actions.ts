import { 
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
} from "@store/action-types";

export const addMarker = (newData) => {
  return {
    payload: newData,
    type: ACTION_ADD_MARKER,
  }
}

export const updateMarker = (newData) => {
  return {
    payload: newData,
    type: ACTION_UPDATE_MARKER,
  }
}