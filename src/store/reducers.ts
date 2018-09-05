import IState from "@common/interfaces/State";
import { ACTION_ADD_MARKER } from "@store/action-types";

const initialState: IState = {
  markers: []
}

export const rootReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_MARKER:
      return { ...state, markers: [ ...state.markers, action.payload] }
  }
  return state;
}