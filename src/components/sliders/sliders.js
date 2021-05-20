import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

const ageMarks = [
  {
    value: 20,
    label: '20',
  },
  {
    value: 29,
    label: '29',
  }
]

const CustomSlider = withStyles({
  root: {
    color: '#EF515F',
    height: 20,
  },
  thumb: {
    height: 30,
    width: 30,
    marginTop: -13,
    marginLeft: -12,
    backgroundColor: '#EF515F',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 1,
    color: '#EF515F',
    opacity: 1,
  },
  rail: {
    height: 1,
  },
  markLabel: {
    fontSize: '16px',
    color: 'black',
  },
  valueLabel: {
    left: 'calc(-50% + 14px)',
  },
})(Slider);

const valueText = (value) => {
  return `${value}살`;
};

export const InputRangeSlider = (props) => {
  const { onChange, ageRange } = props;
  const classes = useStyles;

  return (
    <div className={classes.root}>
      <CustomSlider
        min={20}
        max={29}
        value={ageRange}
        onChange={onChange}
        marks={ageMarks}
        valueLabelDisplay="auto"
        getAriaValueText={valueText}
      />
    </div>
  );
};

export const InputSlider = (props) => {
  const {min, max, onChange, value} = props;
  const classes = useStyles;

  return (
    <div className={classes.root}>
      <CustomSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        marks={ageMarks}
        valueLabelDisplay="auto"
        getAriaValueText={valueText}
      />
    </div>
  )
}

InputRangeSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  ageRange: PropTypes.array.isRequired,
}

InputSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}