import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import PersonIcon from '@material-ui/icons/Person';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './header.css';

export const Header = (props) => {
  const { onClick, titleText, backRoute } = props;
  const history = useHistory();

  return (
    <div className="Header">
      <div className="HeaderBackButton">
        {backRoute !== '' ? (
          <IconButton
            onClick={() => {
              history.push(backRoute);
              if (typeof onClick !== 'undefined') onClick();
            }}
          >
            <ArrowBackIosIcon
              style={{ color: 'black' }}
              fontSize="default"
              className="HeaderIcon"
            ></ArrowBackIosIcon>
          </IconButton>
        ) : (
          <IconButton onClick={onClick}>
            <ArrowBackIosIcon
              style={{ color: 'black' }}
              fontSize="default"
              className="HeaderIcon"
            ></ArrowBackIosIcon>
          </IconButton>
        )}
      </div>
      {titleText !== '' ? (
        <div className="HeaderTitleText">
          <span
            style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}
          >
            {titleText}
          </span>
        </div>
      ) : null}
      <IconButton disabled>
        <ArrowBackIosIcon
          style={{ color: 'transparent', fontSize: 'default', padding: '7px' }}
        />
      </IconButton>
    </div>
  );
};

export const HomeHeader = (props) => {
  const { titleText, feedbackClick, logoutClick } = props;
  const [expand, setExpand] = React.useState(false);
  const history = useHistory();

  const handleClick = (e) => {
    setExpand(!expand);
  };

  return expand ? (
    <div className="ExpandedHomeHeader">
      <div
        className="HomeTitle"
        style={{ height: '10vh', display: 'flex', alignContent: 'center' }}
      >
        <span style={{ fontSize: '20px', fontWeight: 'bold', margin: 'auto' }}>
          {titleText}
        </span>
      </div>
      <div className="NavigationSection">
        <div className="MyInfoButton">
          <IconButton onClick={(e) => history.push('/myInfo')}>
            <PersonIcon
              style={{ padding: '7px', fontSize: '60px', color: 'black' }}
            />
          </IconButton>
          <span style={{ fontSize: '15px', margin: 'auto' }}>내 정보</span>
        </div>

        <div className="FeedbackButton">
          <IconButton onClick={feedbackClick}>
            <FeedbackIcon
              style={{ padding: '7px', fontSize: '60px', color: 'black' }}
            />
          </IconButton>
          <span style={{ fontSize: '15px', margin: 'auto' }}>도움</span>
        </div>

        <div className="LogoutButton">
          <IconButton onClick={logoutClick}>
            <ExitToAppIcon
              style={{ padding: '7px', fontSize: '60px', color: 'black' }}
            />
          </IconButton>
          <span style={{ fontSize: '15px', margin: 'auto' }}>로그아웃</span>
        </div>
      </div>
      <IconButton onClick={handleClick} className="ExpandButton">
        <ExpandLessRoundedIcon
          style={{ padding: '7px', fontSize: '40px', color: 'black' }}
        />
      </IconButton>
    </div>
  ) : (
    <div className="ShrunkHomeHeader">
      <div
        className="HomeTitle"
        style={{ height: '10vh', display: 'flex', alignContent: 'center' }}
      >
        <span style={{ fontSize: '20px', fontWeight: 'bold', margin: 'auto' }}>
          {titleText}
        </span>
      </div>
      <IconButton onClick={handleClick} className="ExpandButton">
        <MenuRoundedIcon
          style={{ padding: '7px', fontSize: '35px', color: 'black' }}
        />
      </IconButton>
    </div>
  );
};
