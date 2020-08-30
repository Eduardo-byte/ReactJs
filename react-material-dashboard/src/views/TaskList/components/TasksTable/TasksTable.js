import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { getInitials } from 'helpers';
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TasksTable = props => {
  const { className, tasks, ...rest } = props;
  const classes = useStyles();


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Categorie</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>                
              <TableBody>
                { tasks.map( task => {
                    return (
                      <TableRow key={task.id}>
                        <TableCell>{ task.id }</TableCell>
                        <TableCell>{ task.descricao }</TableCell>
                        <TableCell>{ task.categoria }</TableCell>
                        <TableCell>{ task.done ? 'Concluded' : 'Pending' }</TableCell>
                        <TableCell>
                          { task.done ?
                            (
                              <DoneAllIcon/> 
                            ) :
                            (
                              <IconButton onClick={ event => props.editTask(task.id) } color="secondary">
                              { task.done ? 
                                (
                                  <DoneAllIcon/>
                                ) :
                                (
                                  <TimerIcon/>
                                )
                              }
                              </IconButton> 
                            )  
                            }  
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={ event => props.deleteTask(task.id) } color="secondary"> 
                            <DeleteIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>  
            </Table>    
          </div>
        </PerfectScrollbar>
      </CardContent>
      
    </Card>
  );
};

TasksTable.propTypes = {
  className: PropTypes.string,
  tasks: PropTypes.array.isRequired
};

export default TasksTable;
