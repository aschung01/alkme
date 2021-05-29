import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import { InputSelect } from '../input_select/input_select';

const textFieldStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: (props) => props.width,
  },
});

const emailTextFieldStyles = makeStyles({
  root: {
    display: 'flex',
    width: '50vw',
  },
});

const passwordTextFieldStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '80vw',
  },
  label: {
    color: 'black',
    '&:focus': {
      color: 'black',
    },
  },
}));

export const InputTextField = (props) => {
  const { onChange, error, label, helperText } = props;
  const classes = textFieldStyles(props);

  return (
    <form
      className={classes.root}
      onSubmit={(e) => e.preventDefault()}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth={true}
        onChange={onChange}
        required={true}
        error={error}
        label={label}
        helperText={helperText}
      />
    </form>
  );
};

export const EmailInputField = (props) => {
  const {
    emailAddress,
    onChangeField,
    onChangeSelect,
    error,
    label,
    helperText,
  } = props;
  const classes = emailTextFieldStyles();

  return (
    <div className="EmailInputField" style={{width: '100%'}}>
      <div
        className="EmailInput"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '100%' }}
      >
        <form
          className={classes.root}
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth={true}
            onChange={(e) => onChangeField(e.target.value)}
            required={true}
            error={error}
            label={label}
          />
        </form>
        <span style={{ verticalAlign: 'bottom' }}>@</span>
        <InputSelect
          value={emailAddress}
          itemValues={['snu.ac.kr', 'yonsei.ac.kr', 'korea.ac.kr']}
          onChange={(e) => onChangeSelect(e.target.value)}
        />
      </div>
      <FormHelperText error={error}>
        {error ? helperText : ''}
      </FormHelperText>
    </div>
  );
};

export const PasswordInputField = (props) => {
  const { label, onChange, error, helperText } = props;
  const classes = passwordTextFieldStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl className={clsx(classes.margin, classes.textField)}>
      <InputLabel className={classes.label} error={error} style={{color: 'rgba(0, 0, 0, 0.5)'}}>
        {label}
      </InputLabel>
      <Input
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={(e) => {
          setValues({ ...values, password: e.target.value });
          if(typeof onChange !== 'undefined')
            onChange(e);
        }}
        onSubmit={(e) => e.preventDefault()}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

InputTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.string,
};

EmailInputField.propTypes = {
  emailAddress: PropTypes.string.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
};

PasswordInputField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired,
};
