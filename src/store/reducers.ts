import IState from "@common/interfaces/State";

import {
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_DELETE_MARKER,
	ACTION_ADD_MAP_CENTER,
	ACTION_UPDATE_MARKER_LIST,
} from "@store/action-types";
import { Action } from '@common/interfaces/Actions';
import IMarker from "@common/interfaces/Marker";
import IDataForUpdateList from "@common/interfaces/DataForUpdateList";

const initialState: IState = {
	map: {
		center: { lat: 0, lng: 0}
	},
	markers: new Map(),
}

const addMarker = (state: IState, marker: IMarker): Iterable<[string, IMarker]> => {
	state.markers.set( marker.id, { ...marker, coords: state.map.center })
	return state.markers.entries();
}

const updateMarker = (markers: Map<string, IMarker>, newMarker: IMarker): Iterable<[string, IMarker]> => {
	markers.set(newMarker.id, newMarker);
	return markers.entries();
}

const deleteMarker = (markers: Map<string, IMarker>, id: string): Iterable<[string, IMarker]> => {
	markers.delete(id);
	return markers.entries();
}

const updateMarkerList = (markers: Map<string, IMarker>, data: IDataForUpdateList): Iterable<[string, IMarker]> => {
	const fromValue: IMarker = markers.get(data.from) as IMarker;
	if (fromValue === undefined) {
		return markers;
	}
	
	const result: [string, IMarker][] = [];
	markers.forEach((value, key) => {
		if (key !== data.from) { 
			if (key === data.to) {
				result.push([data.from , fromValue]);
			}
			result.push([key, value])
		}
	});

	return result;
}

export const rootReducer = (state: IState = initialState, action: Action): IState => {
  switch (action.type) {
    case ACTION_ADD_MARKER:
			return { ...state, markers: new Map(addMarker(state, action.payload))  }
    case ACTION_UPDATE_MARKER:
			return { ...state, markers: new Map(updateMarker(state.markers, action.payload)) }
    case ACTION_DELETE_MARKER:
			return { ...state, markers: new Map(deleteMarker(state.markers, action.payload)) }
		case ACTION_ADD_MAP_CENTER: 
			return { ...state, map: { ...state.map, center: action.payload }}
		case ACTION_UPDATE_MARKER_LIST:
			return { ...state, markers: new Map(updateMarkerList(state.markers, action.payload)) }
  }  
  return state;
}
