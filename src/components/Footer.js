import React from 'react';
import '../styles/Footer.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import InsertChartIcon from '@material-ui/icons/InsertChart';


export default function SimpleBottomNavigation(tabswitch) {
  const [value, setValue] = React.useState(1);
  const handleChange = (newValue) => {
      tabswitch(newValue)
  }

  return (
    <BottomNavigation>
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleChange(newValue);
      }}
      showLabels
      className="footer-nav"
    >
      <BottomNavigationAction label="Groups" icon={<GroupIcon />} />
      <BottomNavigationAction label="Me" icon={<PersonIcon />} />
      <BottomNavigationAction style={{display: 'none'}} label="Scoreboard" icon={<InsertChartIcon />} disabled />
    </BottomNavigation>
  );
}
