import ICoords from "@common/interfaces/Coords";

export default interface IMarker {
	id: string;
	title: string;
	coords: ICoords;
}