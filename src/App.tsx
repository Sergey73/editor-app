import * as React from 'react';
import './App.scss';

import Map from './components/map/Map';
import Menu from './components/menu/Menu';
// import IMarker from '@common/interfaces/Marker';

class App extends React.Component {
  // markers: IMarker[];

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor">
        <div className="map">
          <Map { ...this.props } />
        </div>
        <div className="menu">
          <Menu { ...this.props } />
        </div>
      </div>
    );
  }
}

export default App;
