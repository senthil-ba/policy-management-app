import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from 'formik';
import { Button, Box, CircularProgress } from '@material-ui/core';
import CustomModal from '../UI/CustomModal/CustomModal';
import FormikField from '../FormikField/FormikField';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/index';


const initialValues = {
    policyName: '',
    policyAmount: '',
    policyTenure: '',
    policyStartDate: '07-08-2020'
};

const policySchema = Yup.object().shape({
    policyName: Yup.string().required("Required"),
    policyAmount: Yup.string().required("Required"),
    policyTenure: Yup.string().required("required"),
    policyStartDate: Yup.string().required("required")
});

const Purchase = (props) => {
    const [open, setOpen] = React.useState(true);
    const history = useHistory();
    const handleClose = () => {
        setOpen(!open);
        history.replace('/home');
    };

    const handleSubmit = (policyDetails) => {
        const updatedPolicyDetails = { ...policyDetails, userId: props.userId };
        props.onPurchase(updatedPolicyDetails, props.token);
    }

    let form = <CircularProgress />;

    if (!props.loading && !props.purchased) {
        form = (<Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={policySchema}
        >
            {({ dirty, isValid }) => {
                return (
                    <Form>
                        <Box margin={1}>
                            <FormikField name="policyName" label="Policy Name" required />
                        </Box>
                        <Box margin={1}>
                            <FormikField name="policyAmount" label="Policy Amount" required />
                        </Box>
                        <Box margin={1}>
                            <FormikField name="policyTenure" label="Policy Tenure" required />
                        </Box>
                        <Box margin={1}>
                            <FormikField name="policyStartDate" label="Policy StartDate" required />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!dirty || !isValid}
                            type="Purchase"
                        >
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>);
    } else {
        const content = 'Hurry!!! Policy Purchase is Successful!!!';
        form = <CustomModal content={content}  open={open && props.purchased}  handleClose={handleClose} />;
    }

    // const purchasedRedirect = props.purchased ? <Redirect to="/home" /> : null;
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Policy Purchase</h1>
            {form}
            <br />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.policy.loading,
        purchased: state.policy.purchased,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchase: (policyDetails, token) => dispatch(actions.purchasePolicy(policyDetails, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);