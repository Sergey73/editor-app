import * as React from 'react';
import './App.scss';

import Map from './components/map/Map';
import Menu from './components/menu/Menu';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor">
        <div className="map">
          <Map />
        </div>
        <div className="menu">
          <Menu />
        </div>
      </div>
    );
  }
}

export default App;
