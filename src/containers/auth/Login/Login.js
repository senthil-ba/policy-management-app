import React from 'react';
import { FormControl, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    Button: {
        marginTop: 10,
        backgroundColor: "#eee"
    }, 
    FormControl: {
        margin: "20px 20px 20px 20px",
        width: "60%",
        boxShadow: "0 2px 3px #ccc", 
        border: "1px solid #eee",
        padding: "10px", 
        boxSizing: "border-box"        
    },
    Div: {
        textAlign: "center",
    }
});


export default function Login(props) {
    const styles = useStyles();

    const inputHandler = (event) => {
        console.log(event.target.value);
    }

    return (

        <div className={styles.Div}>
        <FormControl variant='outlined' className={styles.FormControl}> 
            <TextField id="user-id" label="User Id" onChange={inputHandler} />
            <TextField id="password" type="password" label="Password" />
            <Button className={styles.Button}>SIGN IN</Button>
            <Button className={styles.Button}>Switch To SignUp</Button>
        </FormControl>
        </div>
    );
};