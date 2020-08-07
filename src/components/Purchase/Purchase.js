import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import FormikField from '../../containers/auth/FormikField/FormikField';
import { connect } from 'react-redux';
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

const purchase = (props) => {

    const handleSubmit = (policyDetails) => {
        alert(JSON.stringify(policyDetails));
        props.onPurchase(policyDetails);
    }

    return (
        <div style={{textAlign : "center"}}>
            <h1>Policy Purchase</h1>
            <Formik
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
            </Formik>
        </div>
    )

};

const mapDispatchToProps = dispatch => {
    return {
        onPurchase: policyDetails => dispatch(actions.purchasePolicy(policyDetails))
    };
};

export default connect(null, mapDispatchToProps)(purchase);