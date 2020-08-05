import React from 'react';

import Header from '../../components/Header/Header';
import {Container } from '@material-ui/core';

export default function Layout(props) {
    return (
        <React.Fragment>
            <div style={{backgroundColor: '#cfe8fc', height: '150vh'}}> 
            <Header signUp={props.signup} />
            <Container maxWidth="md" >
                <main style={{backgroundColor: 'white', height: '150vh'}}>
                    {props.children}
                </main>
            </Container>
            </div>
        </React.Fragment>
    );
};