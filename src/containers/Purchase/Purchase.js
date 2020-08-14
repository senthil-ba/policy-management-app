import React, { useRef } from 'react';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import { Button, Box, CircularProgress } from '@material-ui/core';
import CustomModal from '../../components/UI/CustomModal/CustomModal';
import FormikField from '../../components/UI/FormikField/FormikField';
import FormikSelect from '../../components/UI/FormikSelect/FormikSelect';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from 'formik-material-ui-pickers';

const initialValues = {
    policyName: '',
    policyAmount: '',
    policyTenure: "5",
    policyStartDate: ''
};

const tenureSelect = [
    {
        label: "5",
        value: "5"
    },
    {
        label: "10",
        value: "10"
    },
    {
        label: "15",
        value: "15"
    },
    {
        label: "20",
        value: "20"
    }
];

const policySchema = Yup.object().shape({
    policyName: Yup.string().required("Required"),
    policyAmount: Yup.number()
        .required("Required")
        .min(1),
    policyTenure: Yup.string().required("required"),
    policyStartDate: Yup.date()
        .required("required")
        .min(new Date())
});

const Purchase = (props) => {
    const tenureRef = useRef("5");
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Form>
                            <Box margin={1}>
                                <FormikField name="policyName" label="Policy Name" required />
                            </Box>
                            <Box margin={1}>
                                <FormikField name="policyAmount" label="Policy Amount" required />
                            </Box>
                            <div style={{ textAlign: "center" }}>
                                <Box marginleft={20} width="80%" >
                                    <FormikSelect
                                        Ref={tenureRef}
                                        name="policyTenure"
                                        items={tenureSelect}
                                        label="Policy_Tenure"
                                        required={true}
                                    />
                                </Box>
                            </div>

                            <Box margin={1}>
                                <Field component={DatePicker} name="policyStartDate" label="Policy Start Date" required />
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
                    </MuiPickersUtilsProvider>
                );
            }}
        </Formik>);
    } else {
        const content = 'Hurry!!! Policy Purchase is Successful!!!';
        form = <CustomModal content={content} open={open && props.purchased} handleClose={handleClose} />;
    }

    // const purchasedRedirect = props.purchased ? <Redirect to="/home" /> : null;
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Purchase));