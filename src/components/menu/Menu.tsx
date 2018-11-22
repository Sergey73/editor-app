import * as React from 'react';
import './Menu.scss';
import IMarker from '@common/interfaces/Marker';
import IDataForUpdateList from '@common/interfaces/DataForUpdateList';

class Menu extends React.Component {
  markers: Map<string, IMarker>;
  props: any;
  dragged: HTMLDivElement;
  over: HTMLDivElement;
  placeholder: HTMLDivElement;

  addMarker: (newDate: IMarker) => {};
  deleteMarker: (id: string) => {};
  updateMarkerList: (data: IDataForUpdateList) => {};
  
  constructor(props) {
    super(props);
    this.createPlaceholder();

    this.addMarker = this.props.addMarker;
    this.deleteMarker = this.props.deleteMarker;
    this.updateMarkerList = this.props.updateMarkerList;
  }
  
  handleEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.which === 13 ) {
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

  // componentDidMount() {}
  
  render() {
    this.markers = this.props.markers;

    return (
      <div className="menu-component">
        <div className="menu-component__input">
          <input type="text"
            placeholder="Новая точка маршрута"
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

  private createPlaceholder() {
    this.placeholder = document.createElement('div');
    this.placeholder.className = 'placeholder';
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

  private createListMarkers() {
    const arrMarkers: IMarker[] = [...this.markers.values()];
    return arrMarkers.map((marker, i) => <div key={i} 
      className="menu-component__row__list__item"
      draggable={ true }
      onDragStart={ this.dragStart }
      onDragEnd={ this.dragEnd }
      data-id={ marker.id }
    >
      <div className="menu-component__row__list__item__text">{ marker.title }</div>
      <span className="close-btn" onClick={ this.removeMarker }>x</span>  
    </div>);
  }
  
  private dragStart = e => { 
    this.dragged = e.target;
    console.dir(this.dragged);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  } 

  private dragEnd = e => {
    this.dragged.style.display = 'flex';
    if(this.dragged.parentNode &&
      this.dragged.parentNode === this.placeholder.parentNode
    ) {
      this.dragged.parentNode.removeChild(this.placeholder);
        
      if (this.dragged.dataset.id === this.over.dataset.id) { return; }
      const data: IDataForUpdateList = {
        from: this.dragged.dataset.id!,
        to: this.over.dataset.id!,
      };
      this.updateMarkerList(data);
    }
  }

  private dragOver = e => {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === 'menu-component__row__list__item') { 
      this.over = e.target;
      this.over.parentNode!.insertBefore(this.placeholder, this.over);
    } else if(e.target.className === 'menu-component__row__list__item__text') {
      this.over = e.target.parentNode;
      this.over.parentNode!.insertBefore(this.placeholder, this.over);
    }   
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
