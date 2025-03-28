import styles from "@/styles/AppointmentCard.module.css";

const AppointmentCard = ({ appointment, onApprove, onDecline }) => (
  <div className={styles.card}>
    <h3>{appointment.username}</h3>
    <p>Doctor: {appointment.doc_name}</p>
    {appointment.type === "offline" && <p>Location: {appointment.location}</p>}
    <p>Type : {appointment.type}</p>
    <p>Date: {appointment.appointment_date}</p>
    <p>Time: {appointment.appointment_time}</p>
    {appointment.status === 'decline' ? (
  <p className={styles.approved}>Declined</p>
) : appointment.status === "approved" ? (
  <p className={styles.approved}>Approved</p>
) : (
  <>
    <button
      className={styles.approveButton}
      onClick={() =>
        onApprove(
          appointment.id,
          appointment.appointment_time,
          appointment.appointment_date,
          appointment.doctor_id
        )
      }
    >
      Approve
    </button>
    <button
      className={styles.declineButton}
      onClick={() => onDecline(appointment.id)}
    >
      Decline
    </button>
  </>
)}
    
  </div>
);

export default AppointmentCard;



