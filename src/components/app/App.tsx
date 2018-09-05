import * as React from 'react';
import { connect } from 'react-redux';
import './App.scss';

import Map from '../map/Map';
import Menu from '../menu/Menu';
import { bindActionCreators } from 'redux';
import { 
  addMarker,
  updateMarker,
} from '@store/actions';

class App extends React.Component {
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

const putStateToProps = (state) => {
  return {
    markers: state.markers,
    x: 1,
  }
};

const putActionToProps = (dispatch) => {
  return {
    addMarker: bindActionCreators(addMarker, dispatch),
    updateMarker: bindActionCreators(updateMarker, dispatch)
  }
}

export default connect(putStateToProps, putActionToProps)(App);


