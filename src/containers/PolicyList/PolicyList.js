import React, { useEffect } from 'react';
import Policy from '../../components/Policy/Policy';
import { connect } from 'react-redux';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const PolicyList = (props) => {
    const { onFetchPolicies, token, userId } = props;

    useEffect(() => {
        onFetchPolicies(token, userId);
    }, [onFetchPolicies, token, userId]);

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
            <div sytle={{ textAlign: "center", padding: "20px" }} >
                <Typography variant="h5" component="h2" style={{padding: "20px"}}>
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
        loading: state.policy.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPolicies: (token, userId) => dispatch(actions.fetchPolicies(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PolicyList));