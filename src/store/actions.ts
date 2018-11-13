import ICoords from '@common/interfaces/Coords';
import IMarker from '@common/interfaces/Marker';
import { 
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_ADD_MAP_CENTER,
	ACTION_DELETE_MARKER,
} from "@store/action-types";

export const addMarker = (marker: IMarker) => {
	return {
		payload: marker,
    type: ACTION_ADD_MARKER,
  }
}

export const updateMarker = (marker: IMarker) => {
	return {
		payload: marker,
    type: ACTION_UPDATE_MARKER,
  }
}

export const deleteMarker = (id: string) => {
	return {
		payload: id,
    type: ACTION_DELETE_MARKER,
  }
}

export const addMapCenter = (coords: ICoords) => {
	return {
		payload: coords,
		type: ACTION_ADD_MAP_CENTER,
	}
}