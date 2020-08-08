import React from 'react';
import PoliciesCard from '../PoliciesCard/PoliciesCard';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    H3: {
        textAlign: "left",
        margin: 20
    }
}));

export default function Policies() {
    const styles = useStyles();
    return (
        <React.Fragment >
            <h3 className={styles.H3}>Policies</h3>
            <Grid container>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <PoliciesCard ></PoliciesCard>
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </React.Fragment>
    );
}; 