import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  titleText: {
    fontSize: '20px',
  },
});

const useStyles = makeStyles({
  dialogPaper: {
    background: '#FFFAEE',
    padding: '10px',
  },
  button: {
    color: '#EF515F',
    fontSize: '18px',
  },
  contentText: {
    color: '#808080',
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <p className={classes.titleText}>{children}</p>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const AlertDialog = (props) => {
  const { title, content, open, onClose } = props;
  const classes = useStyles();

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        onClose={onClose}
        TransitionComponent={Transition}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        open={open}
      >
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent id="dialog-content">
          <DialogContentText className={classes.contentText}>
            {content.split('\n').map((line) => {
              return (
                <span key={line}>
                  {line}
                  <br />
                </span>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            autoFocus
            onClick={onClose}
            color="primary"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
