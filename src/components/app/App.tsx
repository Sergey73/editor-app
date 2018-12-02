import * as React from 'react';
import { connect } from 'react-redux';
import './App.scss';

import Map from '@components/map/Map';
import Menu from '@components/menu/Menu';
import { bindActionCreators, Dispatch, Action } from 'redux';

import { 
  addMarker,
  updateMarker,
  addMapCenter,
  deleteMarker,
  updateMarkerList,
} from '@store/actions';
import IState from '@common/interfaces/State';
import { IProps } from '@common/interfaces/Props';

class App extends React.Component {
  props: IProps;
  
  constructor(props: IProps) {
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

const putStateToProps = (state: IState) => {
  return {
    markers: state.markers,
  }
};

const putActionToProps = (dispatch: Dispatch<Action>) => {
  return {
    addMapCenter: bindActionCreators(addMapCenter, dispatch),
    addMarker: bindActionCreators(addMarker, dispatch),
    deleteMarker: bindActionCreators(deleteMarker, dispatch),
    updateMarker: bindActionCreators(updateMarker, dispatch),
    updateMarkerList: bindActionCreators(updateMarkerList, dispatch),
  }
}

export default connect(putStateToProps, putActionToProps)(App);


