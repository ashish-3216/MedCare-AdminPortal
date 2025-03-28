"use client";
import { useState } from "react";
import styles from "@/styles/addCard.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddDoctorForm() {
  const availabilityOptions = ["9 AM - 12 PM", "1 PM - 5 PM"];
  const [formData, setFormData] = useState({
    doc_name: "",
    doc_degree: "",
    specialization: "",
    experience: "",
    rating: "",
    description: "",
    doc_location: "",
    gender: "Male",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/doctor/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Doctor added successfully!");
        router.push("/doctors");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor.");
    }
  };

  return (
      <div>
        <Link href='/doctor'>
        <button>Doctors Page</button>
        </Link>
    <div className={styles.container}>
      <h1>Add Doctor</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Doctor Name: <input type="text" name="doc_name" value={formData.doc_name} onChange={handleChange} required /></label>
        <label>Degree: <input type="text" name="doc_degree" value={formData.doc_degree} onChange={handleChange} required /></label>
        <label>Specialization: <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required /></label>
        <label>Experience (years): <input type="number" name="experience" value={formData.experience} onChange={handleChange} required /></label>
        <label>Rating (1-5): <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required /></label>
      
        <label>Description: <textarea name="description" value={formData.description} onChange={handleChange} required /></label>
        <label>Location: <input type="text" name="doc_location" value={formData.doc_location} onChange={handleChange} required /></label>
        
        <label>Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <button type="submit" className={styles.book}>Add Doctor</button>
      </form>
    </div>
      </div>
  );
}
