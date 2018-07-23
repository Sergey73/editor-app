import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';

import './Map.scss';

// interface IProps {
//   text: string;
//   age?: number;
// }

// interface IState {
//   email: string;
//   name: string;
// }


// class MapComponent extends React.Component<IProps, IState> {
class MapComponent extends React.Component {
  map: mapboxgl.Map;
  mapbox = mapboxgl;
  mapContainer: any;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhNXR1MDAydGh6bWM3ZzBjaGlrYyJ9.MxdICo0uhxAtmyWpA_CeVw';
    this.map = new this.mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }


  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    // this.mapContainer = <div id="map" className="App__map-container" />;
    return (
      <div ref={el => this.mapContainer = el} className="map" />
    );
  }
}

export default MapComponent;
