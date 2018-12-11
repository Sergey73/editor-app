// import * as React from 'react';
// import { shallow, mount } from 'enzyme';
// import Menu from './Menu';
// import { IProps } from '@common/interfaces/Props';
// // import IMarker from '@common/interfaces/Marker';

// const props: IProps = {
// 	markers: new Map(),
// 	addMapCenter: jest.fn(),
// 	addMarker: jest.fn(),
// 	deleteMarker: jest.fn(),
// 	updateMarker: jest.fn(),
//   updateMarkerList: jest.fn(),
// }

// describe('<Menu />', () => {
//    it("renders input", () => {
//      const menu = shallow(<Menu { ...props } />);

//      const input = menu.find('input');
//      console.log(input);
//      expect(input.length).toEqual(1);
//    });
  
//   //it("set input value by Enter key", () => {
//   //  const wrapper = shallow(<Menu {...props } />);

// //    var a = wrapper.find('input');

//       // a
//       // .simulate("change", { target: { value: 'new makr 1' }})
//       // .simulate('keyPress', { charCode: 13 })
//       // .simulate('click');

//       // console.dir(a.get(0).props);
//     // menu.update();
//     // input.simulate('keypress', {key: '13'});
//     // menu.update();
//       // console.log(input.get(0));
//       // const div = menu.find('div');
//       // console.log(div);
   
//     // input.simulate('Enter', {
//     //   which: 13
//     // })
//     // const ig = wrapper.find('.my-input');
//     // console.log(ig.value);
//     // expect(ig).toBe('New marker1');

//   // });
// });

// // найти инпут
// // ввести туда значение 
// // создать маркер
// // добавить к маркеру title
// // сохранить данные в store
// // очистить поле


// /* 
// test('customMethod should call trackEvent with the correct argument', () => {
//     const baseProps = {
//       // whatever fake props you want passed to the component
//       // ...
//       trackEvent: jest.fn(),
//     };
//     const wrapper = shallow(<AdPage {...baseProps} />);
  
//     wrapper.instance().customMethod();
  
//     expect(baseProps.trackEvent).toHaveBeenCalledTimes(1);
  
//     expect(baseProps.trackEvent).toHaveBeenCalledWith({
//       category: 'eventCategory',
//       action: 'eventAction',
//       label: 'eventAction',
//     });
//   });  */