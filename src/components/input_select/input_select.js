import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    border: '0px',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      boxShadow: '0 0 0 0.2rem rgba(255, 255, 255, 0.5)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const InputSelect = (props) => {
  const { value, itemValues, onChange } = props;
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.margin}>
        <Select
          value={value}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          {itemValues.map((e) => {
            return <MenuItem key={e} value={e}>{e}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

InputSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  itemValues: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
