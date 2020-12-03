import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h2">{text}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
