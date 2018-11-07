import IState from "@common/interfaces/State";

import {
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_DELETE_MARKER,
	ACTION_ADD_MAP_CENTER,
} from "@store/action-types";
import IMarker from "@common/interfaces/Marker";

const initialState: IState = {
	map: {
		center: { lat: 0, lng: 0}
	},
	markers: new Map(),
}

const addMarker = (state, marker) => {
	state.markers.set( marker.id, { ...marker, coords: state.map.center })
	return state.markers.entries();
}

const updateMarker = (markers, newMarker) => {
	return markers.map((marker) => {
		if (marker.id === newMarker.id) {
			marker.coords = newMarker.coords;
		}
		return marker;
	})
}

const deleteMarker = (markers: Map<number, IMarker>, id: number) => {
	debugger
	// удалить с карты
	markers.delete(Number(id));
	return markers.entries();
}

export const rootReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_MARKER:
			return { ...state, markers: new Map(addMarker(state, action.payload))  }
    case ACTION_UPDATE_MARKER:
			return { ...state, markers: [  ...updateMarker(state.markers, action.payload)] }
    case ACTION_DELETE_MARKER:
			return { ...state, markers: new Map(deleteMarker(state.markers, action.payload)) }
		case ACTION_ADD_MAP_CENTER: 
			return { ...state, map: { ...state.map, center: action.payload }}
  }  
  return state;
}
