import React from 'react';
import PropTypes from 'prop-types';

export const Title = (props) => {
  const { titleText, titleHelperText } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 25px' }}>
      <p
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Noto-Sans',
        }}
      >
        {titleText.split('\n').map((line) => {
          return (
            <span key={line}>
              {line}
              <br />
            </span>
          );
        })}
      </p>
      {titleHelperText ?? (
        <p style={{ fontSize: '10px', fontFamily: 'Noto-Sans' }}>
          {titleHelperText}
        </p>
      )}
    </div>
  );
};

export const SmallTitle = (props) => {
  const { titleText, titleHelperText } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: '15px', fontFamily: 'Noto-Sans' }}>
        {titleText.split('\n').map((line) => {
          return (
            <span key={line}>
              {line}
              <br />
            </span>
          );
        })}
      </p>
      {titleHelperText ? (
        <p style={{ fontSize: '13px', color: '#505050', fontFamily: 'Noto-Sans', marginTop: '0px' }}>
          {titleHelperText.split('\n').map((line) => {
          return (
            <span key={line}>
              {line}
              <br />
            </span>
          );
        })}
        </p>
      ) : (
        <div style={{ height: '0px' }} />
      )}
    </div>
  );
};

Title.propTypes = {
  titleText: PropTypes.string.isRequired,
  titleHelperText: PropTypes.string,
};
