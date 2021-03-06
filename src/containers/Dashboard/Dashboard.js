import React, { useEffect } from 'react'; 
import Policies from '../../components/Policies/Policies';
import Services from '../../components/Services/Services';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux'; 


const Dashboard = (props) => {
    const { onFetchPolicies, token, userId } = props;
    useEffect(() => {
        onFetchPolicies(token, userId);
    }, [onFetchPolicies, token, userId]);

    const length = props.policiesDetails ? props.policiesDetails.length : 'NIL';
    return (
        <div>            
            <Policies policies={length}></Policies>
            <Services></Services>
            <br />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        policiesDetails: state.policy.policiesDetails,
        token: state.auth.token, 
        userId: state.auth.userId, 
        loading: state.policy.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPolicies: (token, userId) => dispatch(actions.fetchPolicies(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);