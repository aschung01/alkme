import React from 'react';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  warningAlert: {
    marginBottom: '16vh',
  },
});

export const SuccessAlert = (props) => {
  const {open} = props;

  return (
    <Snackbar open={open} autoHideDuration = {3000}>
      <Alert variant="filled" severity="success">
        성공적으로 전송되었습니다!
      </Alert>
    </Snackbar>
  );
};

export const WarningAlert = (props) => {
  const {open, alertText} = props;
  const classes = useStyles();

  return (
    <Snackbar className={classes.warningAlert} open={open} autoHideDuration={3000}>
      <Alert variant="filled" severity="warning">
        {alertText}
      </Alert>
    </Snackbar>
  )
}