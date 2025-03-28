"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/components/useAuthHook";
import { useEffect, useState } from "react";
import styles from "@/styles/login.module.css"; // Import the CSS module

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/doctor"); // Redirect authenticated users
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            email : credentials.username,
            password : credentials.password
        }),
      });
      console.log(credentials);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("Login successful!");
        router.push("/doctor");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username : e.target.value })}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password : e.target.value })}
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>Login</button>
    </form>
  );
};

export default Login;
