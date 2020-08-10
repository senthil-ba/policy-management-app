import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomModal from '../UI/CustomModal/CustomModal';
import FormikField from "../FormikField/FormikField";
import FormikSelect from "../FormikSelect/FormikSelect";


const genderSelect = [
    {
        label: "Male",
        value: "male"
    },
    {
        label: "Female",
        value: "female"
    },
    {
        label: "Others",
        value: "others"
    }
];

const maritalStatus = [
    {
        label: "Married",
        value: "married"
    },
    {
        label: "Single",
        value: "single"
    },
    {
        label: "Divorced",
        value: "divorced"
    }
];

const alphabetsSpaceRegex = /^[a-zA-Z ]*$/;
const tenDigitNumber = /^\d{10}$/;

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .required("Required"),
    username: Yup.string()
        .matches(alphabetsSpaceRegex, 'Only alphabets and Space allowed')
        .min(2, "Too Short!"),
    password: Yup.string()
        .min(8, 'Minimum 8 characters required!')
        .required('Required!'),
    email: Yup.string()
        .lowercase()
        .email('Must be a valid email!')
        .required('Required!'),
    contact: Yup.string()
        .matches(tenDigitNumber, '10 digits expected')
        .required('Required!'),
    citizenship: Yup.string().required("Required"),
    dateofbirth: Yup.string().required("Required"),
    registrationdate: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    maritalstatus: Yup.string().required("Required"),
});



function UserDetails(props) {

    let initialValues = {
        name: "",
        username: '',
        password: '',
        email: '',
        contact: '',
        citizenship: '',
        dateofbirth: '',
        registrationdate: '',
        address: '',
        state: '',
        country: 'India',
        maritalstatus: "",
        gender: ""
      };

    initialValues= props.values;

    const getValues = () => {
        return initialValues;
    }

    
    let form = <CircularProgress />;
    if (!props.loading) {
        form = (<Formik
            enableReinitialize
            initialValues={getValues()}
            onSubmit={props.handleSubmit}
            validationSchema={SignupSchema}
        >
            {({ dirty, isValid }) => {
                return (
                    <Form>
                        <div>
                            <FormikField name="name" label="Name" required />
                            <FormikField name="username" label="User Name" required />
                            <FormikField
                                name="password"
                                label="Password"
                                required
                                type="password"
                            />
                        </div>
                        <div>
                            <FormikField name="email" label="Email" required />
                            <FormikField name="contact" label="Contact Number" required />
                            <FormikField name="citizenship" label="Citizenship" required />
                        </div>

                        <div>
                            <FormikField name="dateofbirth" label="Date of Birth" required />
                            <FormikField name="registrationdate" label="Registration Date" required />
                        </div>

                        <div>
                            <FormikField name="address" label="Address" required />
                        </div>

                        <div>
                            <FormikField name="state" label="State" required />
                            <FormikField name="country" label="Country" required />
                        </div>

                        <div>
                            <FormikSelect
                                name="gender"
                                items={genderSelect}
                                label="Gender"
                                required
                            />
                            <FormikSelect
                                name="maritalstatus"
                                items={maritalStatus}
                                label="Marital Status"
                                required
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!dirty || !isValid}
                            type="submit"
                        >
                            Submit
            </Button>
                    </Form>
                );
            }}
        </Formik>);
    }

    let modalDialog = null;
    if (props.isAuthenticated) {
        modalDialog = <CustomModal content={props.modalContent} open={props.isAuthenticated} handleClose={props.handleClose} />;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>{props.heading}</h1>
            {modalDialog}
            {form}
        </div>
    );
};

export default UserDetails;