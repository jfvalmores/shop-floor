import React from 'react';

const Overlay = ({ color }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        height: '50%',
        width: '50%',
        borderRadius: '10%',
        zIndex: 1,
        opacity: 0.25,
        backgroundColor: color,
      }}
    />
  )
}

export default Overlay;