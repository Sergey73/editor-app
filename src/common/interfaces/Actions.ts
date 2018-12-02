import {
	ACTION_ADD_MARKER,
	ACTION_DELETE_MARKER,
	ACTION_UPDATE_MARKER,
	ACTION_ADD_MAP_CENTER,
	ACTION_UPDATE_MARKER_LIST,
} from '@store/action-types';
import IMarker from '@common/interfaces/Marker';
import ICoords from '@common/interfaces/Coords';
import IDataForUpdateList from '@common/interfaces/DataForUpdateList';

export interface IActionAddMarker {
	payload: IMarker;
	type: ACTION_ADD_MARKER;
}

export interface IActionDeleteMarker {
	payload: string;
	type: ACTION_DELETE_MARKER;
}

export interface IActionUpdateMarker {
	payload: IMarker;
	type: ACTION_UPDATE_MARKER;
}

export interface IActionAddMapCenter {
	payload: ICoords;
	type: ACTION_ADD_MAP_CENTER;
}

export interface IActionUpdateMarkerList {
	payload: IDataForUpdateList;
	type: ACTION_UPDATE_MARKER_LIST;
}

export type Action = IActionAddMarker | 
	IActionDeleteMarker |
	IActionUpdateMarker |
	IActionAddMapCenter |
	IActionUpdateMarkerList;
