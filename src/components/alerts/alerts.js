import React from 'react';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

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
