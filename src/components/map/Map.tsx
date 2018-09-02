import * as mapboxgl from 'mapbox-gl';
import './Map.scss';
import * as React from 'react';
import IMarker from '@common/interfaces/Marker';

class MapComponent extends React.PureComponent {
  markers: IMarker[]; 
  props: any;
  dispatch: any;
  private map: mapboxgl.Map;
  private mapbox = mapboxgl;
  private setMapContainer: React.Ref<HTMLDivElement>;
  private mapContainer: HTMLDivElement;

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.setMapContainer = (el:HTMLDivElement) => { this.mapContainer = el };
  }
  
  componentDidMount() {
    this.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhNXR1MDAydGh6bWM3ZzBjaGlrYyJ9.MxdICo0uhxAtmyWpA_CeVw';
    this.map = new this.mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.addMarkers();
  }
  
  render() {
    this.markers = this.props.markers;
    debugger
    this.addMarkers()

    return (
      <div ref={ this.setMapContainer } className="map" />
    );
  }
  
  componentWillUnmount() {
    this.map.remove();
  }

  private addMarkers() {
    if (!this.map) { return }
    this.markers.forEach(marker => this.addMarker(marker));
  }

  private addMarker(marker: IMarker) {
    debugger
    const coords = this.map.getCenter();
    const item = document.createElement('div');
    item.classList.add('truck');

    // Create a new marker
    new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(this.map);
  }
}

export default MapComponent;
