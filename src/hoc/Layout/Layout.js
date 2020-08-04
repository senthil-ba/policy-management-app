import React from 'react';

import Header from '../../components/Header/Header';

const layout = (props) => {
    return (
        <React.Fragment>            
            <Header signUp={props.signup}/>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}; 

export default layout;