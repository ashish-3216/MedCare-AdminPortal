import React from 'react';
import styles from '../styles/dashboardHeader.module.css';

const DashboardHeader = ({ heading, text, children }) => (
  <header className={styles.header}>
    <h1>{heading}</h1>
    {text && <p>{text}</p>}
    {children}
  </header>
);

export default DashboardHeader;