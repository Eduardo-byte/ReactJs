import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
//const headers = { 'x-tenant-id' : 'eduardo@gmail.com' }; 

const Dashboard = props => {

  const classes = useStyles();

  const [tasks , setTasks] = useState([]);
  const [openDialog , setOpenDialog] = useState(false);
  const [message , setMessage] = useState('');

  const listTasks = () => {
    axios.get(API_URL , {
      headers : { 'x-tenant-id' : localStorage.getItem('User_logged') }
    }).then(response => {
      if(localStorage.getItem('User_logged')){
        const listOfTasks = response.data
        console.log(listOfTasks)
        setTasks(listOfTasks)
      }else{
      setMessage('Please login before access dashboard')
      setOpenDialog(true)
      }
    }).catch( error =>{
      console.log(error)
    } )
  }

  const checkLogin = () =>{
    if(localStorage.getItem('User_logged')){
      setOpenDialog(false)
    }else{
      props.history.push('/login')
    }
  }

  useEffect(() => {
    listTasks();
  }, [] )

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget tasks={tasks}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice tasks={tasks}/>
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={ event => setOpenDialog(false) }> 
        <DialogTitle>Atention</DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <Button onClick={ checkLogin }>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(Dashboard);
