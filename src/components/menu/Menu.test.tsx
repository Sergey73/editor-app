import * as React from 'react';
import { shallow } from 'enzyme';
import Menu from './Menu';
import { IProps } from '@common/interfaces/Props';
// import IMarker from '@common/interfaces/Marker';

const props: IProps = {
	markers: new Map(),
	addMapCenter: jest.fn(),
	addMarker: jest.fn(),
	deleteMarker: jest.fn(),
	updateMarker: jest.fn(),
  updateMarkerList: jest.fn(),
}

describe('<Menu />', () => {
  it("renders input", () => {
    const menu = shallow(<Menu { ...props } />);

    const input = menu.find('input');
    expect(input.length).toEqual(1);
  });
  
  it("set input value by Enter key", () => {
    const menu = shallow(<Menu {...props } />);

    const input = menu.find('input');
    input.simulate('change', {target: {value: 'New marker1'}});
    input.simulate('keypress', {key: 'Enter'});
    const div = menu.find('.menu-component__container__list__item__text');
    // input.simulate('Enter', {
    //   which: 13
    // })
    console.log(div);
    const ig = input.get(0) as React.ReactElement<HTMLInputElement>;
    // expect(ig.value).toBe('New marker1');

  });
});

// найти инпут
// ввести туда значение 
// создать маркер
// добавить к маркеру title
// сохранить данные в store
// очистить поле


/* 
test('customMethod should call trackEvent with the correct argument', () => {
    const baseProps = {
      // whatever fake props you want passed to the component
      // ...
      trackEvent: jest.fn(),
    };
    const wrapper = shallow(<AdPage {...baseProps} />);
  
    wrapper.instance().customMethod();
  
    expect(baseProps.trackEvent).toHaveBeenCalledTimes(1);
  
    expect(baseProps.trackEvent).toHaveBeenCalledWith({
      category: 'eventCategory',
      action: 'eventAction',
      label: 'eventAction',
    });
  });  */