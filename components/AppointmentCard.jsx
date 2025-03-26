import styles from '@/styles/AppointmentCard.module.css'

const AppointmentCard = ({ appointment, onApprove, onDecline }) => (
  <div className={styles.card}>
    <h3>{appointment.patientName}</h3>
    <p>Doctor: {appointment.doctorName}</p>
    <p>Date: {appointment.date}</p>
    <p>Time: {appointment.time}</p>
    <button className={styles.approveButton} onClick={() => onApprove(appointment.id)}>Approve</button>
    <button className={styles.declineButton} onClick={() => onDecline(appointment.id)}>Decline</button>
  </div>
);

export default AppointmentCard;
