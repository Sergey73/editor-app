import ICoords from '@common/interfaces/Coords';
import IMarker from '@common/interfaces/Marker';
import IDataForUpdateList from '@common/interfaces/DataForUpdateList';

import {
	IActionAddMarker,
	IActionDeleteMarker,
	IActionUpdateMarker,
	IActionAddMapCenter,
	IActionUpdateMarkerList,
} from '@common/interfaces/Actions';
import { 
	ACTION_ADD_MARKER,
	ACTION_DELETE_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_ADD_MAP_CENTER,
	ACTION_UPDATE_MARKER_LIST,
} from "@store/action-types";

export const addMarker = (marker: IMarker): IActionAddMarker => {
	return {
		payload: marker,
    type: ACTION_ADD_MARKER,
  }
}

export const deleteMarker = (id: string): IActionDeleteMarker => {
	return {
		payload: id,
		type: ACTION_DELETE_MARKER,
	}
}

export const updateMarker = (marker: IMarker):IActionUpdateMarker => {
	return {
		payload: marker,
    type: ACTION_UPDATE_MARKER,
  }
}

export const addMapCenter = (coords: ICoords): IActionAddMapCenter => {
	return {
		payload: coords,
		type: ACTION_ADD_MAP_CENTER,
	}
}

export const updateMarkerList = (data: IDataForUpdateList): IActionUpdateMarkerList => {
	return {
		payload: data,
    type: ACTION_UPDATE_MARKER_LIST
  }
}