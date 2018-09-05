import * as React from 'react';
import './Menu.scss';
import IMarker from '@common/interfaces/Marker';

class Menu extends React.Component {
  markers: IMarker[] = [];
  props: any;
  addMarker: (newDate:any) => {};

  constructor(props) {
    super(props);
    this.addMarker = this.props.addMarker;
  }
  
  handleEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.which === 13) {
      this.addMarkerToState(e);
    }
  }

  // проверка на обновление
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return 
  // }

  componentDidMount() {
    // this.setMapContainer = (el:HTMLDivElement) => { this.mapContainer = el };
  }

  
  render() {
    this.markers = this.props.markers;

    return (
      <div className="menu-component">
        <div className="menu-component__input">
          <input type="text"
            placeholder="Новая точка маршрута"
            // onChange={ this.addMarkerToState }
            onKeyPress={ this.handleEnter }
          />
        </div>
        <div className="menu-component__row">
          <div className="menu-component__row__list">
            { this.createListMarkers() }
          </div>
        </div>
      </div>
    );
  }

  private addMarkerToState(e) {
    const value = e.target.value;
    const newMarker = this.createMarker();
    newMarker.title = value;
    this.addMarker(newMarker);
  }

  private createListMarkers() {
    return this.markers.map((marker, i) => <div key={i}> { marker.title }</div>);
  }
  
  private createMarker() {
    return {
      coords: {lat: null, lng: null},
      id: +new Date(),
      title: null,
    }
  }

}

export default Menu;
