import React, { useEffect, useState } from 'react';
import firebase from "../shared/firebase";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToApp from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const logout = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
};

function Header() {
    const classes = useStyles();
    const [user, setUser] = useState(firebase.auth().currentUser);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setUser);
    }, []);

    const StyleTypography = withStyles({
        root: {
            margin: "7px",
        }
    })(Typography);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            {user && (
                                <div align="left">
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <PersonOutlineIcon/>
                                    </IconButton>
                                </div>
                            )}
                        </Grid>
                        <Grid item xs>
                            <StyleTypography variant="h6" className={classes.title} align="center">
                                ChoreWeek
                            </StyleTypography>
                        </Grid>
                        <Grid item xs>
                          {user && (
                              <div align="right">
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={logout}
                                    color="inherit"
                                >
                                  <ExitToApp/>
                                </IconButton>
                              </div>
                          )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
