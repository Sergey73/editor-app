import IMarker from '@common/interfaces/Marker';
import ICoords from '@common/interfaces/Coords';
import { 
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_ADD_MAP_CENTER,
	ACTION_DELETE_MARKER,
} from "@store/action-types";

export const addMarker = (data: IMarker) => {
	return {
		payload: data,
    type: ACTION_ADD_MARKER,
  }
}

export const updateMarker = (data: IMarker) => {
	return {
		payload: data,
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