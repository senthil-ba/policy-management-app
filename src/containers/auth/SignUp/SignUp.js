import React from 'react';
import { FormControl, Button, TextField, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from './Country';


const useStyles = makeStyles({
  Button: {
    marginTop: 10
  }
});

export default function SignUp () {
  const styles = useStyles();
  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={1} sm={4} />
        <Grid item xs={8} sm={4}>
          <FormControl fullWidth>
            <TextField id="name" label="Name" />
            <TextField id="password" type="password" label="Password" />
            <TextField id="address" label="Address" />
            <TextField id="citizenship" label="Citizenship" />
            <TextField id="date" label="Birthday" type="date"
              InputLabelProps={{
                shrink: true,
              }} />
            <CountrySelect />
            <Button className={styles.Button}>SIGN UP</Button>            
          </FormControl>
        </Grid>
        <Grid item xs={1} sm={4} />
      </Grid>
    </Grid>
  );
};