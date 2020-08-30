import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TasksToolbar, TasksTable } from './components';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(8)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
//const headers = { 'x-tenant-id' : 'eduardo@gmail.com' }; 

const TaskList = props => {
  const classes = useStyles();

  const [tasks , setTasks] = useState([]);
  const [openDialog , setOpenDialog] = useState(false);
  const [message , setMessage] = useState('');

  const save = (task) => {
    axios.post(API_URL , task , {
      headers : { 'x-tenant-id' : localStorage.getItem('User_logged') }
    }).then( response => {
      //listTasks()
      const newTask = response.data
      setTasks( [...tasks , newTask] )
      setMessage('Task Succefully Added')
      setOpenDialog(true)
    }).catch(error => {
      setMessage('Error Ocurred')
      setOpenDialog(true)
      //console.log(error)
    })
  }

  const listTasks = () => {
    axios.get(API_URL , {
      headers : { 'x-tenant-id' : localStorage.getItem('User_logged') }
    }).then(response => {
      if(localStorage.getItem('User_logged')){
        const listOfTasks = response.data
        console.log(listOfTasks)
        setTasks(listOfTasks)
      }else{
      setMessage('Please login before access tasks')
      setOpenDialog(true)
      }
     
    }).catch( error =>{
      setMessage('Error Ocurred' , error)
      setOpenDialog(true)
      //console.log(error)
    } )
  }

  const editTask = (id) => {
    axios.patch(`${API_URL}/${id}`, null , {
      headers : { 'x-tenant-id' : localStorage.getItem('User_logged') }
    }).then( response => {
      //listTasks();
      const list = [ ...tasks ]
      list.forEach(task => {
        if(task.id === id){
          task.done = true;
        }
      })
      setTasks(list);
      setMessage('Task Succefully Completed')
      setOpenDialog(true)
      console.log("status: " + response.status)
    }).catch( error =>{
      setMessage('Error Ocurred' , error)
      setOpenDialog(true)
      //console.log(error)
    })
  }

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}` , {
      headers : { 'x-tenant-id' : localStorage.getItem('User_logged') }
    }).then( response => {
      //listTasks();
      const list = tasks.filter( task => task.id !== id )
      setTasks(list);
      setMessage('Task Succefully Deleted')
      setOpenDialog(true)
      console.log(localStorage.getItem('User_logged'))
      //console.log(response)
    }).catch( error =>{
      setMessage('Error Ocurred' , error)
      setOpenDialog(true)
      //console.log(error)
    })
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
      <TasksToolbar save = {save}/>
      <div className={classes.content}>
        <TasksTable deleteTask={deleteTask} editTask={editTask} tasks={tasks} />
      </div>
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

export default withRouter(TaskList);
