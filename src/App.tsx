import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';
import './App.css';



class App extends React.Component {
  map: mapboxgl.Map;
  mapbox = mapboxgl;
  mapContainer: any;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhNXR1MDAydGh6bWM3ZzBjaGlrYyJ9.MxdICo0uhxAtmyWpA_CeVw';
    this.map = new this.mapbox.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }


  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    this.mapContainer = <div id="map" className="App__map-container" />;
    return (
      <div className="App">
        { this.mapContainer }
      </div>
    );
  }
}

export default App;
