import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
// connect подключает компоненыт к стору
import { createStore } from 'redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import IState from '@common/interfaces/State';


const initialState: IState = {
  markers: [ // по умолчанию будет пустой массив
    {
      coords: {lat: 11, lon: 22},
      id: '111',
      title: 'заголовок 1',
    }
  ],
}

const ACTION_ADD_MARKER = 'ACTION_ADD_MARKER';
// const ACTION_REMOVE_MARKER = 'ACTION_REMOVE_MARKER';
// const ACTION_UPDATE_MARKER = 'ACTION_UPDATE_MARKER';



// const actionRemoveMarker = {
//   payload: null,
//   type: ACTION_REMOVE_MARKER,
// }

// const actionUpdateMarker = {
//   payload: null,
//   type: ACTION_UPDATE_MARKER,
// }

// const addMarker = (newData) => {
//   return {
//       payload: newData,
//       type: ACTION_ADD_MARKER,
//     } 
// }

const rootReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_MARKER:
      return { ...state, markers: [ ...state.markers, action.payload] }
  }
  return state;
}

const store = createStore(rootReducer);
// console.dir(store.getState());

const mapStateToProps = (state) => {
  return {
    markers: state.markers,
    x: 1,
  }
};

const WrapAppComponent = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <WrapAppComponent/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
