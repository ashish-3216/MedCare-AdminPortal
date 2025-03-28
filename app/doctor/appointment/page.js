"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import DashboardHeader from "@/components/dashboardshell";
import AppointmentCard from "@/components/AppointmentCard";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(0)
  const onDecline = async (id) =>{
    try{
      const result = await fetch(`http://localhost:5000/api/v1/bookappointment/decline`,
        {
          method : 'POST',
          headers : {'content-type' : 'application/json'},
          credentials : 'include',
          body : JSON.stringify({
            id
          })
        }
      )
      if(result.ok){
        prompt('appointment Decline');
        setRefresh((prev)=>prev+1)
      }
    }catch(err){
      prompt('cant Decline appointment');
    }
  }
  const onApprove = async (id, appointment_time ,appointment_date,doctor_id)=>{
    try{
      console.log(id, appointment_time ,appointment_date,doctor_id);
      const result = await fetch(`http://localhost:5000/api/v1/bookappointment/approve`,
        {
          method : 'POST',
          headers : {'content-type' : 'application/json'},
          credentials : 'include',
          body : JSON.stringify({
            id, 
            appointment_time ,
            appointment_date,
            doctor_id
          })
        }
      )
      if(result.ok){
        prompt('appointment approved');
        setRefresh((prev)=>prev+1);
      }
    }catch(err){
      prompt('cant approve appointment');
    }
  }
  const fetchAppointment = async () => {
    try {
      const result = await fetch(
        ` http://localhost:5000/api/v1/bookappointment/appointments`
      );
      const res = await result.json();
      setAppointments(res.data);
    } catch (err) {
      console.log("error while fetching",err.message);
    }
  };
  useEffect(()=>{
    fetchAppointment();
  },[refresh])

  return (
    <>
      <DashboardHeader heading="Appointments" text="Manage your appointments" />
      <Link href='/doctor'>
        <button>Doctors Page</button>
      </Link>
      <div>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} onApprove={onApprove} onDecline={onDecline}/>
        ))}
      </div>
    </>
  );
}
