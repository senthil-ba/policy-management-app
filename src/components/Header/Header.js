import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, IconButton, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    TypographyStyles: {
        flex: 1
    }
});

export default function Header(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const styles = useStyles();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let navigationItems = <Button color="inherit" className={styles.Button} component={Link} to="/signup">Sign Up</Button>;
    if (props.isAuth) {
        navigationItems = (
            <React.Fragment>
                <Button color="inherit" className={styles.Button}
                    component={Link} to="/home">Home</Button>
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/home">Profile</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                    </Menu>
                </div>
            </React.Fragment>
        );
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={styles.TypographyStyles}>Policy Management App</Typography>
                {navigationItems}
            </Toolbar>
        </AppBar>
    );
}