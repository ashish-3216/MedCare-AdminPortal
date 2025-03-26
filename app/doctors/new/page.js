import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/newdoctor.module.css'
import DashboardHeader from '@/components/dashboardshell';

function NewDoctorPage() {
    return (
        <>
        
        <DashboardHeader heading="Add New Doctor" text="Enter doctor details below." />
        <form className={styles.form}>
          <label>
            Name:
            <input type="text" className={styles.input} />
          </label>
          <label>
            Specialty:
            <input type="text" className={styles.input} />
          </label>
          <label>
            Contact:
            <input type="text" className={styles.input} />
          </label>
          <button type="submit" className={styles.button}>Add Doctor</button>
        </form>
        </>
    );
  }
  
export default NewDoctorPage ;