import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from "yup";
import { Grid, Button, Box, CircularProgress } from "@material-ui/core";
import FormikField from "../../../components/UI/FormikField/FormikField";
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Typography from '@material-ui/core/Typography';

const initialValues = {
    username: '',
    password: ''
};

const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
});

const login = (props) => {
    const handleSubmit = (credentials) => {
        props.onSignIn(credentials.username, credentials.password);
    };

    let form = <CircularProgress />

    if (!props.loading) {
        form = (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={SignupSchema}
            >
                {({ dirty, isValid }) => {
                    return (
                        <Grid container>
                            <Grid item xs={1} sm={3} />
                            <Grid item xs={10} sm={6}>
                                <Form>
                                    <Box margin={1}>
                                        <div>
                                            <FormikField name="username" label="User Name" required />
                                        </div>
                                    </Box>
                                    <Box margin={1}>
                                        <FormikField
                                            name="password"
                                            label="Password"
                                            required
                                            type="password"
                                        />
                                    </Box>
                                    <Box margin={1}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={!dirty || !isValid}
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Form>
                            </Grid>
                            <Grid item xs={1} sm={3} />
                        </Grid>
                    );
                }}
            </Formik>);
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h5" component="h2">
                Sign In
            </Typography>
            {authRedirect}
            {errorMessage}
            {form}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (username, password) => dispatch(actions.signIn(username, password))
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(login));