import React from 'react';
import { Formik, Form, Field } from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {
    Button,
  } from '@material-ui/core';
  import {
    fieldToTextField,
  } from 'formik-material-ui';

function UpperCasingTextField(props) {
    const {
      form: {setFieldValue},
      field: {name},
    } = props;
    const onChange = React.useCallback(
      event => {
        const {value} = event.target;
        setFieldValue(name, value ? value.toUpperCase() : '');
      },
      [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
  }

const Purchase = () => (
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
                <Form>
                    <Box margin={1}>
                        <Field
                            component={UpperCasingTextField}
                            name="email"
                            type="email"
                            label="Email"
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
            )}
        />    
);

export default Purchase; 