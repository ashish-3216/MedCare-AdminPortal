"use client";
import LogoutButton from "@/components/LogoutButton";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DoctorLayout({ children }) {
  return <ProtectedRoute>
    <LogoutButton/>
    {children}
    </ProtectedRoute>;
}