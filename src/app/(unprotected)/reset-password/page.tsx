'use client';
import React from 'react';
import LoginSlider from './components/Slider/LoginSlider';
import plateaumedpharmacy from '../../../assets/plateaumedpharmacy.webp';
import classes from './page.module.css';
import ResetPasswordForm from './components/ResetForm';

const ResetPasswordPage = () => {
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
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
