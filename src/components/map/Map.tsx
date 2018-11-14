import * as mapboxgl from 'mapbox-gl';
import './Map.scss';
import * as React from 'react';
import IMarker from '@common/interfaces/Marker';


class MapComponent extends React.Component {
  markers: Map<string, IMarker>; 
  props: any;
  addMapCenter: (newDate:any) => {};
  addMarker: (newDate:any) => {};
  updateMarker: (newDate:any) => {};

  private map: mapboxgl.Map;
  private pathName: string = 'path';
  private pathCoords: any[] = [];
  // private pathCoords: mapboxgl.LngLatLike[] | any[] = [];
  private markersOnMap: Map<string, mapboxgl.Marker> = new Map();
  private mapbox = mapboxgl;
  private setMapContainer: React.Ref<HTMLDivElement>;
  private mapContainer: HTMLDivElement;

  constructor(props) {
    super(props);
    this.addMarker = this.props.addMarker;
    this.updateMarker = this.props.updateMarker;
    this.addMapCenter = this.props.addMapCenter;
    this.setMapContainer = (el:HTMLDivElement) => { this.mapContainer = el };
  }
  
  componentDidMount() {
    this.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhNXR1MDAydGh6bWM3ZzBjaGlrYyJ9.MxdICo0uhxAtmyWpA_CeVw';
    this.map = new this.mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
    });
    this.subscribeToEvents();
    this.addMapCenterCoords();
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // тут проверять поменялись ли координаты маркера или нет
    // debugger
    // let result = true;
    // nextProps.markers.forEach((marker) => {
    //   if (marker.coords.lat === null) {
      //     marker.coords = this.map.getCenter();
      //     this.updateMarker(marker)
    //     result = false;
    //   }
    // });
    // return result;
    return true;
  }

  render() {
    this.markers = this.props.markers;
    const nextMapLength = this.markers.size;
    const prevMapLength = this.markersOnMap.size;
    if ( nextMapLength > prevMapLength ) {
      this.addMarkersOnMap();
    } else if ( nextMapLength < prevMapLength ) {
      this.removeMarkerFromMap();
    }
    
    return (
      <div ref={ this.setMapContainer } className="map" />
      );
    }

    componentWillUnmount() {
      this.map.remove();
  }
  
  private subscribeToEvents() {
    this.map.on('moveend', () => { this.addMapCenterCoords(); });
  }

  private addMapCenterCoords() {
    const centerCoords = this.map.getCenter().wrap();
    this.addMapCenter(centerCoords);
  };
    
  private addMarkersOnMap() {
    if (!this.map) { return }
    this.pathCoords = [];
    this.markers.forEach((marker) => {
      const markerCoords: mapboxgl.LngLatLike = [marker.coords.lng, marker.coords.lat];
      if (!this.markersOnMap.has(marker.id) ) {
        const itemMarker = this.createMarker();
        itemMarker
          .setLngLat(markerCoords)
          .addTo(this.map);
        this.markersOnMap.set(marker.id, itemMarker);
      };
      this.pathCoords.push(markerCoords);
    });
    this.createPath();
  }

  private createMarker(): mapboxgl.Marker {    
    // const item = document.createElement('div');
    // item.classList.add('truck');
    return new this.mapbox.Marker({
      draggable: true
    });
  }

  private removeMarkerFromMap() {
    this.pathCoords = [];
    [ ...this.markersOnMap.keys()].forEach(id => {
      const markerFromStor = this.markers.get(id);
      if (!this.markers.has(id) ) {
        const markerOnMap = this.markersOnMap.get(id);
        if (markerOnMap) {
          markerOnMap.remove();
          this.markersOnMap.delete(id);
        }
      } else {
        if (markerFromStor) {
          const markerCoords: mapboxgl.LngLatLike = [markerFromStor.coords.lng, markerFromStor.coords.lat];
          this.pathCoords.push(markerCoords);
        }
      }
    });
    this.createPath();
  }

  private createPath() {
    const mapLayer = this.map.getLayer(this.pathName);
    if(typeof mapLayer !== 'undefined') {
      this.map.removeLayer(this.pathName).removeSource(this.pathName);
    }
    this.createSource();
    this.addPathLayer();
  }

  private createSource() {
    this.map.addSource(this.pathName, {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": this.pathCoords,
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
}

export default MapComponent;
