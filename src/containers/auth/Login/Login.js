import React from 'react';
import { Formik, Form, Field } from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {
    Button,
    Grid
} from '@material-ui/core';
import {
    fieldToTextField,
    TextField,
} from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    Button: {
        marginTop: 10,
        backgroundColor: "#eee"
    }, 
    FormControl: {
        margin: "20px 20px 20px 20px",
        boxShadow: "0 2px 3px #ccc", 
        border: "1px solid #eee",
        padding: "10px", 
        boxSizing: "border-box", 
        textAlign: "center"        
    },
    Div: {
        padding: "20px 20px 20px 20px",
        width: "60%",
        textAlign: "center",
    }
});

function UpperCasingTextField(props) {
    const {
        form: { setFieldValue },
        field: { name },
    } = props;
    const onChange = React.useCallback(
        event => {
            const { value } = event.target;
            setFieldValue(name, value ? value.toUpperCase() : '');
        },
        [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

const Purchase = () => {
    const styles = useStyles();
    return (
    <Formik
        initialValues={{
            email: '',
        }}
        validate={values => {
            console.log(values);
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
            }, 500);
        }}
        render={({ submitForm, isSubmitting, touched, errors }) => (
            <Grid container>
            <Grid item xs="1" sm="3" />
            <Grid item xs="10" sm="6">
                
            <Form className={styles.FormControl}>
                <Box margin={1}>
                    <Field
                        component={UpperCasingTextField}
                        name="email"
                        type="email"
                        label="Email"
                    />
                </Box>
                <Box margin={1}>
                    <Field
                        component={TextField}
                        type="password"
                        label="Password"
                        name="password"
                    />
                </Box>
                <Box margin={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Submit
                        </Button>
                </Box>
            </Form>
            
            </Grid>
            <Grid item xs="1" sm="3" />
            </Grid>
            
        )}
    />
)
};

export default Purchase; 