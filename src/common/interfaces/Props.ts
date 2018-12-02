import IMarker from '@common/interfaces/Marker';
import IDataForUpdateList from '@common/interfaces/DataForUpdateList';


export interface IProps {
	markers: Map<string, IMarker>;
	addMapCenter: (newDate: mapboxgl.LngLat) => {};
	addMarker: (newDate: IMarker) => {};
	deleteMarker: (id: string) => {};
	updateMarker: (newDate: IMarker) => {};
  updateMarkerList: (data: IDataForUpdateList) => {};
}