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
  // private geoJsonPathData: GeoJSON.Feature<GeoJSON.Geometry> = {
  //   "type": "Feature",
  //   "properties": {},
  //   "geometry": {
  //     "type": "LineString",
  //     "coordinates": this.pathCoords,
  //   }
  // };


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
    } else if (nextMapLength === prevMapLength) {
      this.updateMarkers();
    }
    
    if( nextMapLength || prevMapLength) {
      this.createPath();
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
      this.map.on('load', () => {
        this.createSource();
        this.addPathLayer();
      });
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
      ;
      if (!this.markersOnMap.has(marker.id) ) {
        const itemMarker = this.createMarker();
        itemMarker
        .setLngLat(markerCoords)
        .addTo(this.map)
        .on('dragend', () => this.onDragEnd())
        .on('drag', () => this.onDrag(marker));
        this.markersOnMap.set(marker.id, itemMarker);
      };
      this.pathCoords.push(markerCoords);
    });
    // this.createPath();
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
    // this.createPath();
  }

  private updateMarkers() {
    this.pathCoords = [];
    // this.markersOnMap.forEach((marker) => {
    this.markers.forEach((marker) => {
      // const roundValue = 5;
      
      // const lngLat = marker.getLngLat();
      const lngLat = marker.coords;
      // const markerCoords: mapboxgl.LngLatLike = [this.roundNumber(lngLat.lng, roundValue), this.roundNumber(lngLat.lat, roundValue)];
      const markerCoords: mapboxgl.LngLatLike = [lngLat.lng,lngLat.lat];
      this.pathCoords.push(markerCoords);
    });
    // this.createPath();
  }

  private createPath() {
    const source: mapboxgl.GeoJSONSource = (this.map.getSource(this.pathName) as mapboxgl.GeoJSONSource);
    const geoJsonPathData: GeoJSON.Feature<GeoJSON.Geometry> = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": this.pathCoords,
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
  
  private onDragEnd() {
    console.dir('end');
    this.createPath();
  }
  // поменть в create and remove marker
  // ставить координаты в stor
  private onDrag(marker: IMarker) {
    const markerOnMap = this.markersOnMap.get(marker.id);
    if (markerOnMap) {
      const newLngLat = markerOnMap.getLngLat();
      const newMarker = {...marker, coords: newLngLat}
      this.updateMarker(newMarker);
    }
    // this.pathCoords = [];
    // this.markersOnMap.forEach((marker) => {
    //   console.dir(marker);
    //   // const roundValue = 5;
    //   const lngLat = marker.getLngLat();
    //   // const markerCoords: mapboxgl.LngLatLike = [this.roundNumber(lngLat.lng, roundValue), this.roundNumber(lngLat.lat, roundValue)];
    //   const markerCoords: mapboxgl.LngLatLike = [lngLat.lng,lngLat.lat];
    //   this.pathCoords.push(markerCoords);
    // });
    // this.createPath();
  }

  // private roundNumber(value: number, count: number):number {
  //   const arr = value.toString().split('.');
  //   if (arr.length === 1) {
  //     return value;
  //   }
  //   return Number([arr[0], arr[1].slice(0, count) ].join('.'));
  // }

}

export default MapComponent;
