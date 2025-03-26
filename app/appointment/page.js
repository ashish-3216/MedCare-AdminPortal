"use client"
import Link from "next/link";
import React from "react";
import { useState } from "react";
import DashboardHeader from "@/components/dashboardshell";
import AppointmentCard from "@/components/AppointmentCard";
const initialAppointments = [
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', date: '2025-04-01', time: '10:00 AM' },
    { id: 2, patientName: 'Jane Roe', doctorName: 'Dr. Johnson', date: '2025-04-02', time: '11:00 AM' }
  ];
  
  export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState(initialAppointments);
  
    const handleApprove = (id) => {
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      alert('Appointment Approved!');
    };
  
    const handleDecline = (id) => {
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      alert('Appointment Declined.');
    };
  
    return (
      <>
        <DashboardHeader heading="Appointments" text="Manage your appointments" />
        <div>
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </>
    );
  }

