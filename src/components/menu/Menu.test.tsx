import * as React from 'react';
import { shallow } from 'enzyme';
import Menu from './Menu';


describe('<Menu />', () => {
  it("renders input", () => {
    const menu = shallow(<Menu />);

    const input = menu.find('input');
    expect(input.length).toEqual(1);
  });
  
  it("set input value", () => {
    const menu = shallow(<Menu />);

    const input = menu.find('input')
    input.simulate('change', {target: {value: 'New marker1'}});
    // console.log(input.get(0).props)
    input.simulate('Enter', {
      which: 13
    })
    const ig = input.get(0) as any;
    console.log(ig)
    expect(ig.value).toBe('New marker1');

  });
});

// найти инпут
// ввести туда значение 
// создать маркер
// добавить к маркеру title
// сохранить данные в store
// очистить поле