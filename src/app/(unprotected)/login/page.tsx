'use client';
import React from 'react';
import Authentication from './components/Login';
import LoginSlider from './components/Slider/LoginSlider';
import plateaumedpharmacy from '../../../assets/plateaumedpharmacy.webp';
import classes from './page.module.css';

const LoginPage = () => {
  return (
    <div className={classes.wrapper}>
      <div
        className={classes.slider}
        style={{
          backgroundImage: `url(${plateaumedpharmacy.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <LoginSlider />
      </div>
      <div className={classes.form}>
        <Authentication />
      </div>
    </div>
  );
};

export default LoginPage;
