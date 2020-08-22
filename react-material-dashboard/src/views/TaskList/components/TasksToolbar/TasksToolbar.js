import React , { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Button , 
  TextField ,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const TasksToolbar = props => {
  const { className, ...rest } = props;

  const [ description , setDescription ] = useState('')
  const [ category , setCategory ] = useState('')

  const classes = useStyles();

  const submit = (event) => {
    event.preventDefault();
    const task = {
      descricao : description, 
      categoria : category
    }
    props.save(task)
    //console.log( ` values: description - ${description} , category - ${category} ` )
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <div className={classes.row}>
        <Grid container>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              className={classes.searchInput}
              placeholder="Task Description"
              label="Description:"
              fullWidth
              value={description}
              onChange = { event => setDescription(event.target.value) }
            />
          </Grid> 
          <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel> Categorie </InputLabel>
              <Select value={category} onChange = { event => setCategory(event.target.value) }>
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value={"TRABALHO"}> Work </MenuItem>
                <MenuItem value={"ESTUDOS"}> Study </MenuItem>
                <MenuItem value={"PESSOAL"}> Personal </MenuItem>
                <MenuItem value={"OUTROS"}> Others </MenuItem>
              </Select>  
            </FormControl>
          </Grid>
          <Grid item md={2} sm={12} xs={12}>
            <Button  onClick={submit} variant="contained" color="secondary"> Add </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

TasksToolbar.propTypes = {
  className: PropTypes.string
};

export default TasksToolbar;
