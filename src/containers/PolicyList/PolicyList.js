import React, { useEffect } from 'react';
import Policy from '../../components/Policy/Policy';
import { connect } from 'react-redux';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import * as actions from '../../store/actions/index';

const PolicyList = (props) => {
    const { onFetchPolicies } = props;

    useEffect(() => {
        console.log('inside use effect');
        onFetchPolicies();
    }, [onFetchPolicies]);


        let policyList = <CircularProgress />;

    if (!props.loading) {
        policyList = (<Grid container spacing={3} style={{ paddingLeft: "40px", paddingRight: "40px" }}>
            {
            props.policiesDetails.map(policyDetails => (
            <Grid key={policyDetails.id} item xs={12} sm={5}>
                <Policy  policyDetails={policyDetails}></Policy>
            </Grid>))
            }   
        </Grid>);
    }

    return (
        <div>
            <div sytle={{ textAlign: "center", margin: "20px" }} >
                <Typography variant="h5" component="h2">
                    All Purchased Policies
                </Typography>
            </div>
            <br />
            {policyList}
        </div >
    );
}

const mapStateToProps = state => {
    return {
        policiesDetails: state.policy.policiesDetails,
        loading: state.policy.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPolicies: () => dispatch(actions.fetchPolicies())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyList);