import { 
	ACTION_ADD_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_ADD_MAP_CENTER,
	ACTION_DELETE_MARKER,
} from "@store/action-types";

export const addMarker = (data) => {
	return {
		payload: data,
    type: ACTION_ADD_MARKER,
  }
}

export const updateMarker = (data) => {
	return {
		payload: data,
    type: ACTION_UPDATE_MARKER,
  }
}

export const deleteMarker = (data) => {
	return {
		payload: data,
    type: ACTION_DELETE_MARKER,
  }
}

export const addMapCenter = (data) => {
	return {
		payload: data,
		type: ACTION_ADD_MAP_CENTER,
	}
}