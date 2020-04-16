import React from 'react';
import '../styles/Footer.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import InsertChartIcon from '@material-ui/icons/InsertChart';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(1);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="footer-nav"
    >
      <BottomNavigationAction style = {{display: 'none'}} label="Groups" icon={<GroupIcon />} disabled />
      <BottomNavigationAction label="Me" icon={<PersonIcon />} />
      <BottomNavigationAction style={{display: 'none'}} label="Scoreboard" icon={<InsertChartIcon />} disabled />
    </BottomNavigation>
  );
}
