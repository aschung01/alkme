import React from 'react';

export const BackgroundDots = () => {
  return (
    <React.Fragment>
      <span
        className="Dot1"
        style={{
          position: 'absolute',
          top: '5vh',
          left: '35vw',
          height: '40px',
          width: '40px',
          backgroundColor: '#fde3df',
          borderRadius: '50%',
        }}
      />
      <span
        className="Dot2"
        style={{
          position: 'absolute',
          top: '10vh',
          left: '5vw',
          height: '100px',
          width: '100px',
          backgroundColor: '#fbd0ca',
          borderRadius: '50%',
        }}
      />
      <span
        className="Dot3"
        style={{
          position: 'absolute',
          top: '30vh',
          right: '-5vw',
          height: '200px',
          width: '200px',
          backgroundColor: '#f4838a',
          borderRadius: '50%',
        }}
      />
      <span
        className="Dot4"
        style={{
          position: 'absolute',
          bottom: '-15vh',
          left: '-17vw',
          height: '300px',
          width: '300px',
          backgroundColor: '#ef515f',
          borderRadius: '50%',
        }}
      />
    </React.Fragment>
  );
};
