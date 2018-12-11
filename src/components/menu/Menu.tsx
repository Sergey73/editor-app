import * as React from 'react';
import './Menu.scss';
import IMarker from '@common/interfaces/Marker';
import { IProps } from '@common/interfaces/Props';
import IState from '@common/interfaces/State';
import MarkerList from '@components/marker-list/Marker-list';

class Menu extends React.Component<IProps, IState> {
  props: IProps;  
  addMarker: (newDate: IMarker) => {};
  
  constructor(props: IProps) {
    super(props);
    this.addMarker = this.props.addMarker;
  }
  
  handleEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.which === 13 ) {
      this.addMarkerToState(e);
    }
  }

  render() {
    return (
      <div className="menu-component">
        <div className="menu-component__input">
          <input type="text"
            placeholder="Новая точка маршрута"
            onKeyPress={ this.handleEnter }
          />
        </div>
        <div className="menu-component__container">
          <MarkerList { ...this.props } />
        </div>
      </div>
    );
  }

  private addMarkerToState(e) {
    const value: string = e.target.value;
    if (!value.trim()) { 
      e.target.value = '';
      return;
    }
    const newMarker: IMarker = this.createMarker();
    newMarker.title = value;
    this.addMarker(newMarker);
    e.target.value = '';
  }

  private createMarker(): IMarker {
    return {
      coords: { lat: 0, lng: 0 },
      id: (+new Date()).toString(),
      title: '',
    }
  }

}

export default Menu;
