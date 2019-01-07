import * as mapboxgl from 'mapbox-gl';
import './Map.scss';
import * as React from 'react';
import IMarker from '@common/interfaces/Marker';
import ICoords from '@common/interfaces/Coords';
import { IProps } from '@common/interfaces/Props';
import IState from '../../common/interfaces/State';

class MapComponent extends React.Component<IProps, IState> {
  markers: Map<string, IMarker>; 
  props: IProps;
  addMapCenter: (newDate: mapboxgl.LngLat) => {};
  updateMarker: (newDate: IMarker) => {};

  private map: mapboxgl.Map;
  private pathName: string = 'path';
  private pathCoords: mapboxgl.LngLatLike[] = [];
  private markersOnMap: Map<string, mapboxgl.Marker> = new Map();
  private mapbox = mapboxgl;
  private setMapContainer: React.Ref<HTMLDivElement>;
  private mapContainer: HTMLDivElement;

  constructor(props: IProps) {
    super(props);
    this.updateMarker = this.props.updateMarker;
    this.addMapCenter = this.props.addMapCenter;
    this.setMapContainer = (el:HTMLDivElement) => { this.mapContainer = el };
  }
  
  componentDidMount() {
    this.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhNXR1MDAydGh6bWM3ZzBjaGlrYyJ9.MxdICo0uhxAtmyWpA_CeVw';
    this.map = new this.mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: { lng :48.396367282978304, lat: 54.308211687913854 },
      zoom: 16,
      maxZoom: 20,
      minZoom: 1,
      pitch: 50,
    });
    this.subscribeToEvents();
    this.addMapCenterCoords();
  }
      
  render() {
    this.markers = this.props.markers;
    const nextMapLength: number = this.markers.size;
    const prevMapLength: number = this.markersOnMap.size;
    
    if ( nextMapLength > prevMapLength ) {
      this.addMarkersOnMap();
    } else if ( nextMapLength < prevMapLength ) {
      this.removeMarkerFromMap();
    } else if (nextMapLength === prevMapLength) {
      this.updateMarkersOnMap();
    }
    
    if( nextMapLength || prevMapLength) {
      this.createPath();
    }

    return <div ref={ this.setMapContainer } className="map" />
  }
    
  componentWillUnmount() {
    this.map.remove();
  }
  
  private subscribeToEvents() {
    this.map.on('moveend', () => { this.addMapCenterCoords(); });
    this.map.on('load', () => {
      this.createSource();
      this.addPathLayer();
    });
  }
  
  private addMapCenterCoords() {
    const centerCoords: mapboxgl.LngLat = this.map.getCenter().wrap();
    this.addMapCenter(centerCoords);
  };
    
  private addMarkersOnMap() {
    if (!this.map) { return }
    this.pathCoords = [];
    this.markers.forEach((marker: IMarker) => {
      const markerCoords: mapboxgl.LngLatLike = [marker.coords.lng, marker.coords.lat];
      if (!this.markersOnMap.has(marker.id) ) {
        const itemMarker: mapboxgl.Marker = this.createMarker();
        itemMarker
        .setLngLat(markerCoords)
        .setPopup(this.criatePopup(marker.title))
        .addTo(this.map)
        .on('dragend', () => this.createPath())
        .on('drag', () => this.onDrag(marker));
        this.markersOnMap.set(marker.id, itemMarker);
      };
      this.pathCoords.push(markerCoords);
    });
  }

  private criatePopup(title: string): mapboxgl.Popup {
    return new this.mapbox.Popup()
      .setText(title);
  }

  private createMarker(): mapboxgl.Marker {
    return new this.mapbox.Marker({
      draggable: true
    });
  }

  private removeMarkerFromMap() {
    this.pathCoords = [];
    [ ...this.markersOnMap.keys()].forEach(id => {
      const markerFromStor: IMarker = this.markers.get(id)!;
      if (!this.markers.has(id) ) {
        const markerOnMap: mapboxgl.Marker = this.markersOnMap.get(id)!;
        markerOnMap.remove();
        this.markersOnMap.delete(id);
      } else {
        const markerCoords: mapboxgl.LngLatLike = [markerFromStor.coords.lng, markerFromStor.coords.lat];
        this.pathCoords.push(markerCoords);
      }
    });
  }

  private updateMarkersOnMap() {
    this.pathCoords = [];
    const tempMarkersOnMap: Map<string, mapboxgl.Marker> = new Map();

    this.markers.forEach((marker) => {
      const lngLat:ICoords = marker.coords;
      const markerCoords: mapboxgl.LngLatLike = [lngLat.lng,lngLat.lat];
      this.pathCoords.push(markerCoords);

      const markerFromOldObj:mapboxgl.Marker = this.markersOnMap.get(marker.id)!;
      tempMarkersOnMap.set(marker.id, markerFromOldObj)
    });
    this.markersOnMap = tempMarkersOnMap;
  }

  private createPath() {
    const source: mapboxgl.GeoJSONSource = (this.map.getSource(this.pathName) as mapboxgl.GeoJSONSource);
    const geoJsonPathData: GeoJSON.Feature<GeoJSON.Geometry> = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": this.pathCoords as number[][],
      }
    };
    source.setData(geoJsonPathData);
  }

  private createSource() {
    this.map.addSource(this.pathName, {
      type: 'geojson',
      data: {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": this.pathCoords as number[][],
        }
      }
    });
  }

  private addPathLayer() {
    this.map.addLayer({
      "id": this.pathName,
      "type": "line",
      "source": this.pathName,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#888",
        "line-width": 4
      }
    });  
  }

  private onDrag(marker: IMarker) {
    const markerOnMap: mapboxgl.Marker = this.markersOnMap.get(marker.id)!;
    if (markerOnMap) {
      const newLngLat: mapboxgl.LngLat = markerOnMap.getLngLat();
      const newMarker: IMarker = {...marker, coords: newLngLat}
      this.updateMarker(newMarker);
    }
  }

}

export default MapComponent;
