import Link from "next/link";
import React from "react";
import styles from "../../styles/doctor.module.css";
import DashboardHeader from "@/components/dashboardshell";
import DoctorCard from "@/components/doctorCard";
const doctors = [
  { name: 'Dr. Smith', specialty: 'Cardiology', experience: 10 },
  { name: 'Dr. Johnson', specialty: 'Neurology', experience: 12 }
];
export default function DoctorsPage() {
  return (
    <>
      <DashboardHeader heading="Doctors" text="Manage your medical staff">
        <Link href="/doctors/new">
          <button className={styles.button}>Add Doctor</button>
        </Link>
      </DashboardHeader>
      <div>
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </>
  );
}
