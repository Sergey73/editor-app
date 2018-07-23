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
      <div className="menu">menu</div>
    );
  }
}

export default Menu;
