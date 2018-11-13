import * as mapboxgl from 'mapbox-gl';
import './Map.scss';
import * as React from 'react';
import IMarker from '@common/interfaces/Marker';


class MapComponent extends React.Component {
  markers: IMarker[]; 
  props: any;
  addMapCenter: (newDate:any) => {};
  addMarker: (newDate:any) => {};
  updateMarker: (newDate:any) => {};

  private map: mapboxgl.Map;
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
    debugger
    this.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhNXR1MDAydGh6bWM3ZzBjaGlrYyJ9.MxdICo0uhxAtmyWpA_CeVw';
    this.map = new this.mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
    });
    this.subscribeToEvents();
    this.addMapCenterCoords();
    debugger
    // this.addMarkers();
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
    this.addMarkers();

    return (
      <div ref={ this.setMapContainer } className="map" />
    );
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    debugger
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

  private addMarkers() {
    if (!this.map) { return }
    debugger
    this.markers.forEach(marker => this.createMarker(marker));
  }

  private createMarker(marker: IMarker) {    
    const item = document.createElement('div');
    item.classList.add('truck');

    new mapboxgl.Marker()
      .setLngLat([marker.coords.lng, marker.coords.lat])
      .addTo(this.map);
  }
}

export default MapComponent;
