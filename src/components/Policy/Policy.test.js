import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Policy from './Policy';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup=(props={}, state=null)=> {
    const wrapper = shallow(<Policy {...props}/>);
    if(state) wrapper.setState(state);
    return wrapper;
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', ()=> {
    const props = {
        policyDetails: {
            id: 1
        }
    };

    const wrapper = setup(props);
    const policyComponent = findByTestAttr(wrapper, 'card-display');
    expect(policyComponent.length).toBe(1);
});