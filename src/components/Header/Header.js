import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    TypographyStyles: {
        flex: 1
    }
  });

  export default function Header(props) {
    const styles = useStyles(); 
    let signUp = <Button color="inherit" className={styles.Button}>Sign Up</Button>;
    if(props.signUp) {
        signUp = null;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={styles.TypographyStyles}>Policy Management App</Typography>
                {signUp}
            </Toolbar>
        </AppBar>
    );
}