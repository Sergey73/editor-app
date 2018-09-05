import IState from "@common/interfaces/State";
import {
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
} from "@store/action-types";

const initialState: IState = {
  markers: []
}

const updateMarker = (arrMarkers, newMarker) => {
	return arrMarkers.map((marker) => {
		if (marker.id === newMarker.id) {
			marker.coords = newMarker.coords;
		}
		return marker;
	})
}

export const rootReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_MARKER:
      return { ...state, markers: [ ...state.markers, action.payload] }
    case ACTION_UPDATE_MARKER:
      return { ...state, markers: [  ...updateMarker(state.markers, action.payload)] }
  }
  return state;
}
