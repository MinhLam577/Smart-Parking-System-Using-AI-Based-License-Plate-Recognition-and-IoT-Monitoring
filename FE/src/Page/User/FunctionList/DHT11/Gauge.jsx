import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Gauge = ({ value, maxValue }) => {
  return (
    <div style={{ width: '200px', height: '200px' }}>
      <CircularProgressbar
        value={value}
        maxValue={maxValue}
        text={`${value} ppm`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: `rgba(62, 152, 199, ${value / maxValue})`,
          textColor: '#000',
          trailColor: '#d6d6d6'
        })}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <span>0</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

export default Gauge;
