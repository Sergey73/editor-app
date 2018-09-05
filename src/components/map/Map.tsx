import * as mapboxgl from 'mapbox-gl';
import './Map.scss';
import * as React from 'react';
import IMarker from '@common/interfaces/Marker';

class MapComponent extends React.Component {
  markers: IMarker[]; 
  props: any;
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
    this.setMapContainer = (el:HTMLDivElement) => { this.mapContainer = el };
  }
  
  componentDidMount() {
    debugger
    this.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhNXR1MDAydGh6bWM3ZzBjaGlrYyJ9.MxdICo0uhxAtmyWpA_CeVw';
    this.map = new this.mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.addMarkers();
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    debugger
    let result = true;
    nextProps.markers.forEach((marker) => {
      if (marker.coords.lat === null) {
        marker.coords = this.map.getCenter();
        this.updateMarker(marker)
        result = false;
      }
    });
    return result;
  }

  render() {
    this.markers = this.props.markers;
    debugger
    this.addMarkers();

    return (
      <div ref={ this.setMapContainer } className="map" />
    );
  }
  
  componentWillUnmount() {
    this.map.remove();
  }

  private addMarkers() {
    if (!this.map) { return }
    this.markers.forEach(marker => this.createMarker(marker));
  }

  private createMarker(marker: IMarker) {    
    const item = document.createElement('div');
    item.classList.add('truck');

    // Create a new marker
    new mapboxgl.Marker()
      .setLngLat([marker.coords.lng, marker.coords.lat])
      .addTo(this.map);
  }
}

export default MapComponent;
