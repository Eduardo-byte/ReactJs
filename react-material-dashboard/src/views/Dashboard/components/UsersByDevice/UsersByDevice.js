import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import BookIcon from '@material-ui/icons/Book';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CloudIcon from '@material-ui/icons/Cloud';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice = props => {
  const { className, tasks,  ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  var workCategorie = 0;
  var studyCategorie = 0;
  var personalCategorie = 0;
  var othersCategorie = 0;
  for( var x = 0 ; x < tasks.length ; x ++){
    if(tasks[x].categoria == "TRABALHO" ){
      var workCategorie = workCategorie + 1;
      console.log(workCategorie);
    }
    if(tasks[x].categoria == "ESTUDOS" ){
      var studyCategorie = studyCategorie + 1;
      console.log(studyCategorie);
    }
    if(tasks[x].categoria == "PESSOAL" ){
      var personalCategorie = personalCategorie + 1;
      console.log(personalCategorie);
    }
    if(tasks[x].categoria == "OUTROS" ){
      var othersCategorie = othersCategorie + 1;
      console.log(othersCategorie);
    }
  }

  const data = {
    datasets: [
      {
        data: [workCategorie, studyCategorie , personalCategorie , othersCategorie],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Work', 'Study', 'Personal' , 'Others']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Work',
      value: workCategorie,
      icon: <WorkIcon />,
      color: theme.palette.primary.main
    },
    {
      title: 'Study',
      value: studyCategorie,
      icon: <BookIcon />,
      color: theme.palette.error.main
    },
    {
      title: 'Personal',
      value: personalCategorie,
      icon: <AssignmentIndIcon />,
      color: theme.palette.warning.main
    },
    {
      title: 'Others',
      value: othersCategorie,
      icon: <CloudIcon />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Total Tasks By Categorie"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string,
  tasks: PropTypes.array.isRequired
};

export default UsersByDevice;
