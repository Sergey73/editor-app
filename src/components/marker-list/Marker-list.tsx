import * as React from 'react';
import './Marker-list.scss';
import IMarker from '@common/interfaces/Marker';
import IDataForUpdateList from '@common/interfaces/DataForUpdateList';
import { IProps } from '@common/interfaces/Props';
import IState from '@common/interfaces/State';

class MarkerList extends React.Component<IProps, IState> {
  markers: Map<string, IMarker> = new Map();
  props: IProps
  dragged: HTMLDivElement;
  over: HTMLDivElement;
  placeholder: HTMLDivElement;
  deleteMarker: (id: string) => {};
  updateMarkerList: (data: IDataForUpdateList) => {};
  
  constructor(props: IProps) {
    super(props);
    this.createPlaceholder();
    this.deleteMarker = this.props.deleteMarker;
    this.updateMarkerList = this.props.updateMarkerList;
  }
  
  removeMarker: React.MouseEventHandler<HTMLSpanElement> = e => {
    const elem = e.target as HTMLSpanElement;
    const id: string = elem.parentElement!.dataset.id!;
    if (!id) { return; }
    this.deleteMarker(id);
  }

  render() {
    this.markers = this.props.markers;

    return (
      <div className="marker-list"
        onDragOver={ this.dragOver }
      >
        { this.createListMarkers() }
      </div>
    );
  }

  private createPlaceholder() {
    this.placeholder = document.createElement('div');
    this.placeholder.className = 'placeholder';
  }

  private createListMarkers() {
    if (!this.markers) {
      return null;
    }
    const arrMarkers: IMarker[] = [...this.markers.values()];
    return arrMarkers.map((marker, i) => <div key={i} 
      className="marker-list__item"
      draggable={ true }
      onDragStart={ this.dragStart }
      onDragEnd={ this.dragEnd }
      data-id={ marker.id }
    >
      <div className="marker-list__item__text">{ marker.title }</div>
      <span className="close-btn" onClick={ this.removeMarker }>x</span>  
    </div>);
  }
  
  private dragStart = (e: React.DragEvent<HTMLDivElement>) => { 
    this.dragged = e.target as HTMLDivElement;
    e.dataTransfer.effectAllowed = 'move';
    const data: string = this.dragged.textContent as string;
    e.dataTransfer.setData('text/html', data);
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
    if (e.target.className === 'marker-list__item') { 
      this.over = e.target;
      this.over.parentNode!.insertBefore(this.placeholder, this.over);
    } else if(e.target.className === 'marker-list__item__text') {
      this.over = e.target.parentNode;
      this.over.parentNode!.insertBefore(this.placeholder, this.over);
    }   
  }
}

export default MarkerList;
