import React from 'react';
import classes from './Login.module.css'
import { FormControl, Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    Button: {
        marginTop: 10
    }
  });

export default function Login (props) {
    const styles = useStyles(); 

    const inputHandler = (event) => {
        console.log(event.target.value);
    }

    return (
        <Grid container direction="column" className={classes.Grid}>
            <Grid item container>
                <Grid item xs={1} sm={4} />
                <Grid item xs={8} sm={4}>
                    <FormControl fullWidth>
                        <TextField id="user-id" label="User Id" onChange={inputHandler} />
                        <TextField id="password" type="password" label="Password" />
                        <Button className={styles.Button}>SIGN IN</Button>
                        <Button className={styles.Button}>Switch To SignUp</Button>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={4} />
            </Grid>
        </Grid>
    );
};