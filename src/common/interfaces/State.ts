import IMarker from "@common/interfaces/Marker";
import IMap from '@common/interfaces/Map';

export default interface IState {
	markers: Map<number, IMarker>;
	map: IMap;
}