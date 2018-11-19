import ICoords from '@common/interfaces/Coords';
import IMarker from '@common/interfaces/Marker';
import IDataForUpdateList from '@common/interfaces/DataForUpdateList';
import { 
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_ADD_MAP_CENTER,
	ACTION_DELETE_MARKER,
	ACTION_UPDATE_MARKER_LIST,
} from "@store/action-types";
import IAction from '@common/interfaces/Action';

export const addMarker = (marker: IMarker): IAction => {
	return {
		payload: marker,
    type: ACTION_ADD_MARKER,
  }
}

export const updateMarker = (marker: IMarker):IAction => {
	return {
		payload: marker,
    type: ACTION_UPDATE_MARKER,
  }
}

export const deleteMarker = (id: string): IAction => {
	return {
		payload: id,
    type: ACTION_DELETE_MARKER,
  }
}

export const addMapCenter = (coords: ICoords): IAction => {
	return {
		payload: coords,
		type: ACTION_ADD_MAP_CENTER,
	}
}

export const updateMarkerList = (data: IDataForUpdateList): IAction => {
	return {
		payload: data,
    type: ACTION_UPDATE_MARKER_LIST
  }
}