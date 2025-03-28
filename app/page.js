"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/components/useAuthHook";

const HomePage = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  const handleNavigation = () => {
    if (isAuthenticated) {
      router.push("/doctor");
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Welcome to Our Appointment Booking System</h1>
      <p>Book your appointments with trusted doctors easily.</p>
      <button onClick={handleNavigation}>
        {isAuthenticated ? "View Doctors" : "Login to Continue"}
      </button>
    </div>
  );
};

export default HomePage;
