import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Login from './Login';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup=(props={}, state=null)=> {
    const wrapper = shallow(<Login {...props}/>);
    if(state) wrapper.setState(state);
    return wrapper;
};

test('renders without error', ()=> {
    const wrapper = setup();
    const loginComponent = wrapper.find('test');
    expect(loginComponent.length).toBe(1);
});