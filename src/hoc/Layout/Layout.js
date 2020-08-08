import React from 'react';

import Header from '../../components/Header/Header';
import { Grid } from '@material-ui/core';

export default function Layout(props) {
    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#cfe8fc', minHeight: '700px'}}>
                <Grid container direction="column">
                    <Grid item>
                        <Header signUp={props.signup} />
                    </Grid>
                    <Grid item container>
                        <Grid item xs={false} sm={2} />
                        <Grid item xs={12} sm={8}>
                            <main style={{ backgroundColor: 'white'}}>
                                {props.children}
                            </main>
                            <Grid item xs={false} sm={2} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};