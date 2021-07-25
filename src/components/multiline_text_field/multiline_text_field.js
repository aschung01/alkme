import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const multilineTextFieldStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80vw',
  },
});

export const MultilineTextField = (props) => {
  const {onChange, value } = props;
  const classes = multilineTextFieldStyles();

  return (
    <form
      className={classes.root}
      onSubmit={(e) => e.preventDefault()}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={onChange}
        value={value}
        fullWidth={true}
        multiline
        rows={4}
        rowsMax={20}
        placeholder="피드백을 입력해주세요"
        variant="standard"
      />
    </form>
  );
};
