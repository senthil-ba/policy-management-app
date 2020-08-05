import React from 'react';
import Policy from './Policy/Policy';
import { Grid } from '@material-ui/core';

const PolicyList = () => {
    return (
        <React.Fragment>
        <div> <br/></div>
        <div></div>
        <Grid container spacing={2}>
            <Grid item xs={1} />
            <Grid item xs={5}>
                <Policy></Policy>
            </Grid>
            <Grid item xs={5}>
                <Policy></Policy>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={1} />
            <Grid item xs={5}>
                <Policy></Policy>
            </Grid>

        </Grid>
        </React.Fragment>
    );
}

export default PolicyList;