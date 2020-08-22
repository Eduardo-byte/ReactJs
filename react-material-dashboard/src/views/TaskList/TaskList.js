import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TasksToolbar, TasksTable } from './components';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TaskList = () => {
  const classes = useStyles();

  const [tasks] = useState([]);

  const save = (task) => {
    axios.post('https://minhastarefas-api.herokuapp.com/tarefas' , task , {
      headers : { 'x-tenant-id' : 'eduardo@gmail.com' }
    }).then( response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className={classes.root}>
      <TasksToolbar save = {save}/>
      <div className={classes.content}>
        <TasksTable tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskList;
