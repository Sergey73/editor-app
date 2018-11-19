import * as React from 'react';
import './Menu.scss';
import IMarker from '@common/interfaces/Marker';
// import { Draggable } from 'react-beautiful-dnd';
import IDataForUpdateList from '@common/interfaces/DataForUpdateList';

class Menu extends React.Component {
  markers: Map<string, IMarker>;
  props: any;
  dragged: any;
  over: any;
  placeholder = document.createElement('div');

  addMarker: (newDate: IMarker) => {};
  deleteMarker: (id: string) => {};
  updateMarkerList: (data: IDataForUpdateList) => {};
  
  constructor(props) {
    super(props);
    this.placeholder.className = 'placeholder';

    this.addMarker = this.props.addMarker;
    this.deleteMarker = this.props.deleteMarker;
    this.updateMarkerList = this.props.updateMarkerList;
  }
  
  handleEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.which === 13) {
      this.addMarkerToState(e);
    }
  }
  
  removeMarker: React.MouseEventHandler<HTMLSpanElement> = (e: any) => {
    const id: string = e.target.parentElement.dataset.id;
    if (!id) { return; }
    this.deleteMarker(id);
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
          <div className="menu-component__row__list"
            onDragOver={ this.dragOver }
          >
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
    e.target.value = '';
  }

  private createListMarkers() {
    const arrMarkers = [...this.markers.values()];
    return arrMarkers.map((marker, i) => <div key={i} 
      className="menu-component__row__list__item"
      draggable={ true }
      onDragStart={ this.dragStart }
      onDragEnd={ this.dragEnd }
      data-id={ marker.id }
    >
      { marker.title } coords.lat: { marker.coords.lat } coords.lng: { marker.coords.lng }
      <span className="close-btn" onClick={ this.removeMarker }>x</span>  
    </div>);
  }
  
  // private dragStart(e: React.DragEvent<HTMLDivElement>) { 
  private dragStart: any = e => { 
    // const id: number = Number(dragStarte.target.dataset.id);
    // const id = (e.target as HTMLDivElement).id; 
    this.dragged = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  } 

  // handleEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
  private dragEnd: any = e => {
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(this.placeholder);
    
    const data: IDataForUpdateList = {
      from: this.dragged.dataset.id,
      to: this.over.dataset.id,
    };
    this.updateMarkerList(data);
  }

  private dragOver: any = e => {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === 'placeholder') { return; }
    this.over = e.target;
    e.target.parentNode.insertBefore(this.placeholder, e.target);
  }

  private createMarker() {
    return {
      coords: { lat: 0, lng: 0 },
      id: (+new Date()).toString(),
      title: '',
    }
  }

}

export default Menu;
