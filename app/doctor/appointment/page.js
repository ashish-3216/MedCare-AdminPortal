// "use client";
// import Link from "next/link";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import DashboardHeader from "@/components/dashboardshell";
// import AppointmentCard from "@/components/AppointmentCard";

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [refresh, setRefresh] = useState(0);
//   const [filter, setFilter] = useState("all");
//   const onDecline = async (id) => {
//     try {
//       const result = await fetch(
//         `http://localhost:5000/api/v1/bookappointment/decline`,
//         {
//           method: "POST",
//           headers: { "content-type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({
//             id,
//           }),
//         }
//       );
//       if (result.ok) {
//         prompt("appointment Decline");
//         setRefresh((prev) => prev + 1);
//       }
//     } catch (err) {
//       prompt("cant Decline appointment");
//     }
//   };
//   const onApprove = async (
//     id,
//     appointment_time,
//     appointment_date,
//     doctor_id,
//     user_email,
//     doc_name
//   ) => {
//     try {
//       const result = await fetch(
//         `http://localhost:5000/api/v1/bookappointment/approve`,
//         {
//           method: "POST",
//           headers: { "content-type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({
//             id,
//             appointment_time,
//             appointment_date,
//             doctor_id,
//             user_email,
//             doc_name,
//           }),
//         }
//       );

//       if (result.ok) {
//         prompt("appointment approved");
//         setRefresh((prev) => prev + 1);
//       }
//     } catch (err) {
//       prompt("cant approve appointment");
//     }
//   };
//   const fetchAppointment = async () => {
//     try {
//       const result = await fetch(
//         ` http://localhost:5000/api/v1/bookappointment/appointments`
//       );
//       const res = await result.json();
//       setAppointments(res.data);
//     } catch (err) {
//       console.log("error while fetching", err.message);
//     }
//   };
//   useEffect(() => {
//     fetchAppointment();
//   }, [refresh]);

//   // return (
//   //   <>
//   //     <div>
//   //       {appointments.map((appointment) => (
//   //         <AppointmentCard key={appointment.id} appointment={appointment} onApprove={onApprove} onDecline={onDecline}/>
//   //       ))}
//   //     </div>
//   //   </>
//   // );
//   // }

//   const filteredAppointments = appointments.filter((appointment) =>
//     filter === "all" ? true : appointment.status === filter
//   );

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <aside className="w-1/4 p-4 bg-gray-100">
//         <ul>
//           {["all", "Pending", "approved", "declined"].map((status) => (
//             <li
//               key={status}
//               className={`cursor-pointer p-2 ${
//                 filter === status ? "bg-blue-500 text-white" : "bg-white"
//               }`}
//               onClick={() => setFilter(status)}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div className="w-3/4 p-4">
//         {filteredAppointments.map((appointment) => (
//           <AppointmentCard
//             key={appointment.id}
//             appointment={appointment}
//             onApprove={onApprove}
//             onDecline={onDecline}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import AppointmentCard from "@/components/AppointmentCard";
import { RiUserSearchLine } from "react-icons/ri";
import styles from "@/styles/appointment.module.css";
import InputComponent from "@/components/Input_component";
import Button_component from "@/components/Button_component";
import { toast } from "react-toastify";
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const onDecline = async (id) => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/v1/bookappointment/decline`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        }
      );
      if (result.ok) {
        toast.success("Appointment Declined");
        setRefresh((prev) => prev + 1);
      }
    } catch (err) {
      toast.error("Cannot decline appointment");
    }
  };

  const onApprove = async (
    id,
    appointment_time,
    appointment_date,
    doctor_id,
    user_email,
    doc_name
  ) => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/v1/bookappointment/approve`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id,
            appointment_time,
            appointment_date,
            doctor_id,
            user_email,
            doc_name,
          }),
        }
      );

      if (result.ok) {
        toast.success("Appointment Approved");
        setRefresh((prev) => prev + 1);
      }
    } catch (err) {
      toast.error("Cannot approve appointment");
    }
  };

  const fetchAppointment = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/v1/bookappointment/appointments`
      );
      const res = await result.json();
      setAppointments(res.data);
    } catch (err) {
      console.log("Error while fetching", err.message);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [refresh]);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = filter === "all" || appointment.status === filter;
    const matchesQuery = query === "" || appointment.doc_name.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search doctors"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} // ✅ Update search input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery(searchTerm); // ✅ Pressing Enter triggers search
              }
            }}
          />
          <button
            className={styles.searchButton}
            onClick={() => setQuery(searchTerm.toLowerCase())}
          >
            Search
          </button>
        </div>
        <ul>
          {["all", "Pending", "approved", "decline"].map((status) => (
            <li
              key={status}
              className={filter === status ? styles.active : styles.item}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className={styles.content}>
        {filteredAppointments.length > 0 && filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onApprove={onApprove}
            onDecline={onDecline}
          />
        ))}
      </div>
    </div>
  );
}
