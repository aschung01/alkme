import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    background: '#FBD0CA',
  },
}));

export const ChipsArray = (props) => {
  const { array, onDelete } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {array.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              onDelete={onDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </div>
  );
};
