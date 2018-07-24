import * as React from 'react';
import './Menu.scss';

/* interface IProps {
  text: string;
}
*/

interface IState {
  email: string;
  name: string;
}

class Menu extends React.Component {

  state: IState = {
    email: '',
    name: '',
  }

  render() {
    // const { text } = this.props;
    return (
      <div className="menu-component">
        <div className="menu-component__input">
          <input type="text" placeholder="Новая точка маршрута"/>
        </div>
        <div className="menu-component__row">
          строка
        </div>
      </div>
    );
  }
}

export default Menu;
