import React from 'react';
import { FormControl, Button, TextField, FormLabel, MenuItem, Select } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from './Country';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  Grid: {
    marginTop: 10
  },
  Button: {
    marginTop: 10, 
    backgroundColor: "#eee"
  }, 
  Div: {
    textAlign: "center"
  }
}));


export default function SignUp() {
  const styles = useStyles();
  const [value, setValue] = React.useState('female');

  const [age, setAge] = React.useState('');

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dateNow = new Date(); // Creating a new date object with the current date and time
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();

  const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>

  const selectId = React.createRef();
  return (
          <div className={styles.Div}>
          <FormControl className={styles.root}>

            <div>
              <TextField id="name" label="Name" helperText="Incorrect entry" />
              <TextField id="username" label="User Name" helperText="Incorrect entry" />
              <TextField id="password" type="password" label="Password" helperText="Incorrect entry" />
            </div>
            <div>
              <TextField id="email" label="Email Address" helperText="Incorrect entry" />
              <TextField id="contact-no" label="Contact Number" helperText="Incorrect entry" />
              <TextField id="citizenship" label="Citizenship" />

            </div>
            <div>
              <TextField id="date-of-birth" label="Date of Birth" type="date"
                InputLabelProps={{
                  shrink: true,
                }} />

              <TextField id="registration-date" label="Registration Date" type="date"
                defaultValue={materialDateInput}
                disabled
                InputLabelProps={{
                  shrink: true,
                }} />
            </div>
            <div>
              <TextField id="address" label="Address" />
              <TextField id="state" label="State" />
              <CountrySelect />
            </div>

            <div>
             <FormLabel id="gender" component="legend">Gender</FormLabel>
              <Select
                labelId="gender"
                id="demo-simple-select"
                Ref={selectId}
                value={age}
                onChange={handleAgeChange}
              >
                <MenuItem value={'M'}>Male</MenuItem>
                <MenuItem value={'F'}>Female</MenuItem>
                <MenuItem value={'O'}>Others</MenuItem>
              </Select>

              <FormLabel id="marital-status" component="marital">Marital Status</FormLabel>
              <Select
                labelId="marital-status"
                id="marital"
                value={age}
                onChange={handleAgeChange}
                width = "25"
              >
                <MenuItem value={'M'}>Married</MenuItem>
                <MenuItem value={'S'}>Single</MenuItem>
              </Select>
            </div>
            <div>
              <TextField id="identification-proof" label="Identification Proof Type" />
              <TextField id="identification-proof-no" label="Document Number" />
            </div>
            <Button className={styles.Button}>SIGN UP</Button>
          </FormControl>
          </div>
  );
};