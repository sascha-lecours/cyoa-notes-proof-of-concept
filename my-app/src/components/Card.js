import React from 'react';

const cardStyle = {
  margin: '0',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
  borderRadius: '6px',
  padding: '1rem',
  overflow: 'hidden',
  background: 'white',
}

const Card = props => {
  return (
    <div className={`card ${props.className}`} style={cardStyle}>
      {props.children}
    </div>
  );
};

export default Card;
