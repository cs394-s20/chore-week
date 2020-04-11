import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/SvgIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

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

function Header() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PersonOutlineIcon />
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
        </Grid>
      </Grid>
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
