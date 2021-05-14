import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './header.css';

export const Header = (props) => {
  const { onClick, backRoute } = props;
  const history = useHistory();

  return (
    <div className="Header">
      {backRoute !== '' ? (
        <IconButton
          onClick={() => {
            history.push(backRoute);
            if(typeof onClick !== 'undefined')
              onClick();
          }}
        >
          <ArrowBackIosIcon
            fontSize="default"
            className="HeaderIcon"
          ></ArrowBackIosIcon>
        </IconButton>
      ) : (
        <IconButton onClick={onClick}>
          <ArrowBackIosIcon
            fontSize="default"
            className="HeaderIcon"
          ></ArrowBackIosIcon>
        </IconButton>
      )}
    </div>
  );
};
