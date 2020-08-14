import React from 'react';

import Header from '../../components/Header/Header';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

const Layout = (props) => {
    return (
        <div data-test="layout" style={{ backgroundColor: '#cfe8fc', minHeight: '700px' }}>
            <Grid container direction="column">
                <Grid item>
                    <Header isAuth={props.isAuthenticated} />
                </Grid>
                <Grid item container>
                    <Grid item xs={false} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <main style={{ backgroundColor: "white" }}>
                            { props.children }
                        </main>                        
                    </Grid>
                    <Grid item xs={false} sm={2} />
                </Grid>
            </Grid>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps, null)(Layout);