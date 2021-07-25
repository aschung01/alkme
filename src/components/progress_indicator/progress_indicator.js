import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const circularProgressStyles = makeStyles((theme) => ({
  root: {
    color: '#ef515f',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export const CircularProgressIndicator = () => {
  const classes = circularProgressStyles();

  return <CircularProgress className={classes.root} />;
};
