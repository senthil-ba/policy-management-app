import React from 'react';
import PurchaseCard from '../UI/Cards/PurchaseCard/PurchaseCard';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    H3: {
        textAlign: "left",
        margin: 20
    }
}));

export default function Services() {
    const styles = useStyles();
    return (
        <React.Fragment >
            <h3 className={styles.H3}>Services</h3>
            <Grid container>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <PurchaseCard ></PurchaseCard>
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </React.Fragment>
    );
}; 