import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const registerOrLoginButtonStyles = makeStyles({
  root: {
    '&:focus': {
      backgroundColor: '#F4838A',
    },
    backgroundColor: '#F4838A',
    border: 0,
    borderRadius: 30,
    color: 'black',
    height: '8vh',
    width: '80vw',
  },
});

const textButtonStyles = makeStyles({
  root: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 30,
    color: 'black',
    height: '5vh',
    minWidth: '5px',
  },
});

const routeButtonStyles = makeStyles({
  root: {
    '&:focus': {
      backgroundColor: (props) => props.background,
    },
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid gray',
    borderRadius: 10,
    color: 'black',
    height: '12vh',
    width: (props) => props.width !== undefined ? props.width : '80vw',
  },
  child: {
    backgroundColor: (props) => props.background,
  },
  rippleVisible: {
    opacity: 0.5,
    color: (props) => props.background,
  },
});

const navigationButtonStyles = makeStyles({
  root: {
    '&:focus': {
      backgroundColor: '#F4838A',
    },
    backgroundColor: '#F4838A',
    border: 0,
    borderRadius: 5,
    color: 'black',
    height: '9vh',
    width: '80vw',
  },
});

const disabledNavigationButtonStyles = makeStyles({
  root: {
    backgroundColor: '#E1E1E1',
    border: 0,
    borderRadius: 5,
    color: 'white',
    height: '9vh',
    width: '80vw',
  },
});

const matchNumPersonsButtonStyles = makeStyles({
  root: {
    '&:focus': {
      backgroundColor: '#FCFAFA',
    },
    backgroundColor: '#FCFAFA',
    border: '0.5px solid gray',
    borderRadius: 10,
    color: 'black',
    height: '17vh',
    width: '80vw',
    margin: '10px 0',
  },
});

const selectedMatchNumPersonsButtonStyles = makeStyles({
  root: {
    '&:focus': {
      backgroundColor: '#FBD0CA',
    },
    backgroundColor: '#FBD0CA',
    border: '0.5px solid gray',
    borderRadius: 10,
    color: 'black',
    height: '17vh',
    width: '80vw',
    margin: '10px 0',
  },
});

const selectUniversityButtonStyles = makeStyles({
  activated: {
    '&:focus': {
      backgroundColor: '#EF515F',
    },
    backgroundColor: '#EF515F',
    borderRadius: 30,
    color: 'white',
    height: '35px',
    width: '70px',
    margin: '10px',
  },
  deactivated: {
    '&:focus': {
      backgroundColor: '#FCFAFA',
    },
    backgroundColor: '#FCFAFA',
    border: '0.5px solid gray',
    borderRadius: 30,
    color: 'gray',
    height: '35px',
    width: '70px',
    margin: '10px',
  },
});

export const RegisterOrLoginButton = (props) => {
  const { buttonText, onClick } = props;
  const classes = registerOrLoginButtonStyles();
  return (
    <Button className={classes.root} onClick={onClick}>
      <span
        style={{ fontSize: '18px', fontWeight: '500', fontFamily: 'Noto-Sans' }}
      >
        {buttonText}
      </span>
    </Button>
  );
};

export const TextButton = (props) => {
  const { color, onClick, buttonText } = props;

  const classes = textButtonStyles();
  return typeof onClick === undefined ? (
    <Button className={classes.root}>
      <span
        style={{
          color: color,
          fontSize: '15px',
          fontFamily: 'Noto-Sans',
        }}
      >
        {buttonText}
      </span>
    </Button>
  ) : (
    <Button className={classes.root} onClick={onClick}>
      <span
        style={{
          color: color,
          fontSize: '15px',
          fontFamily: 'Noto-Sans',
        }}
      >
        {buttonText}
      </span>
    </Button>
  );
};

export const RouteButton = (props) => {
  const { buttonText } = props;
  const classes = routeButtonStyles(props);
  const { root: buttonClass, ...rippleClasses } = classes;
  return (
    <Button
      className={classes.root}
      TouchRippleProps={{ classes: rippleClasses }}
    >
      <span
        style={{ fontSize: '19px', fontWeight: '500', fontFamily: 'Noto-Sans' }}
      >
        {buttonText}
      </span>
    </Button>
  );
};

export const NavigationButton = (props) => {
  const { buttonText, onClick } = props;
  const classes = navigationButtonStyles();
  return (
    <Button className={classes.root} onClick={onClick}>
      <span>{buttonText}</span>
    </Button>
  );
};

export const DisabledNavigationButton = (props) => {
  const { buttonText } = props;
  const classes = disabledNavigationButtonStyles();
  return (
    <Button className={classes.root} disabled>
      <span style={{ color: 'white' }}>{buttonText}</span>
    </Button>
  );
};

export const MatchNumPersonsButton = (props) => {
  const { buttonText, onClick } = props;
  const classes = matchNumPersonsButtonStyles();
  return (
    <Button className={classes.root} onClick={onClick}>
      <span>{buttonText}</span>
    </Button>
  );
};

export const SelectedMatchBumPersonsButton = (props) => {
  const { buttonText, onClick } = props;
  const classes = selectedMatchNumPersonsButtonStyles();
  return (
    <Button className={classes.root} onClick={onClick}>
      <span>{buttonText}</span>
    </Button>
  );
};

export const SelectUniversityButton = (props) => {
  const { buttonText, onClick, isActivated } = props;
  const classes = selectUniversityButtonStyles(props);
  if (isActivated)
    return (
      <Button className={classes.activated} onClick={onClick}>
        <span>{buttonText}</span>
      </Button>
    );
  else
    return (
      <Button className={classes.deactivated} onClick={onClick}>
        <span>{buttonText}</span>
      </Button>
    );
};

RouteButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

NavigationButton.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
};

MatchNumPersonsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

SelectUniversityButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  isActivated: PropTypes.bool.isRequired,
};
