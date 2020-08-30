import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, IconButton  } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';

import InputIcon from '@material-ui/icons/Input';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import LockOpenIcon from '@material-ui/icons/LockOpen';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { Profile, SidebarNav } from './components';

import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem('User_logged')
    props.history.push('/login')
  }

  if(localStorage.getItem('User_logged')){
    const pages = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />
      },
      {
        title: 'Tasks',
        href: '/tasks',
        icon: <FormatListBulletedIcon />
      },
      {
        title: 'logout',
        icon: <ExitToAppIcon />
      }
    ];
    return (
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <div
          {...rest}
          className={clsx(classes.root, className)}
        >
          <Profile />
          <Divider className={classes.divider} />
          <SidebarNav
            className={classes.nav}
            pages={pages}
          />
        </div>
      </Drawer>
    );
  }else{
    const pages = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />
      },
      {
        title: 'Tasks',
        href: '/tasks',
        icon: <FormatListBulletedIcon />
      },
      {
        title: 'Login',
        href: '/login',
        icon: <LockOpenIcon />
      }
    ];
    return (
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <div
          {...rest}
          className={clsx(classes.root, className)}
        >
          <Profile />
          <Divider className={classes.divider} />
          <SidebarNav
            className={classes.nav}
            pages={pages}
          />
        </div>
      </Drawer>
    );
  }
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default withRouter(Sidebar);
