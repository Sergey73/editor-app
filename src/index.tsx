import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


interface ICoords {
  lat: number;
  lon: number;
}
interface IMarker {
  id: string;
  title: string;
  coords: ICoords;
}
interface IState {
  markers: IMarker[];

}

const initialState: IState = {
  markers: [
    {
      coords: {lat: 11, lon: 22},
      id: '111',
      title: 'заголовок 1',
    }],
}

// const ACTION_ADD_MARKER = 'ACTION_ADD_MARKER';
// const ACTION_REMOVE_MARKER = 'ACTION_REMOVE_MARKER';
// const ACTION_UPDATE_MARKER = 'ACTION_UPDATE_MARKER';


// const actionAddMarker = {
//   payload: null,
//   type: ACTION_ADD_MARKER,
// }

// const actionRemoveMarker = {
//   payload: null,
//   type: ACTION_REMOVE_MARKER,
// }

// const actionUpdateMarker = {
//   payload: null,
//   type: ACTION_UPDATE_MARKER,
// }



const rootReducer = (state: IState = initialState, action) => {
  return state;
}

const store = createStore(rootReducer);

const test = (state) => {
  // tslint:disable-next-line:no-console
  return {
    markers: state.markers,
  }
};

const WrapAppComponent = connect(test)(App);

ReactDOM.render(<Provider store={store}>
    <WrapAppComponent/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
