import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CrimsonCheckbox = withStyles({
  root: {
    color: '#EF515F',
    '&$checked': {
      color: '#EF515F',
    },
    margin: '0px',
    padding: '4px',
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
  label: {
    fontSize: '15px',
  }
})

export const LabeledCheckbox = (props) => {
  const { label, checked, onChange } = props;
  const classes = useStyles();

  return (
    <FormControlLabel
      control={<CrimsonCheckbox checked={checked} onChange={onChange} />}
      label={label}
      classes={{label: classes.label}}
    />
  );
};
