"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useAuth from "./useAuthHook";
import LogoutButton from "./LogoutButton";
import ProtectedRoute from "./ProtectedRoute";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  return (
    <ProtectedRoute>
    <div className={styles.navbar}>
      <div className={styles.leftDiv}>
        <div className={styles.logo}>
          <div className={styles.Frame}>
            <Image
              className={styles.trust}
              src="/medcare_logo.png"
              width={20}
              height={20}
              alt="Logo"
            />
          </div>
          <div className={styles.name}>
            <p>MedCare</p>
          </div>
        </div>
      </div>
    
      {/* Desktop login/register buttons */}
      <div className={styles["nav-login"]} >
        {isAuthenticated &&  (
          <LogoutButton className={styles.logout}/>
        )}
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <Image
          className={styles["menu-img"]}
          src={isMenuOpen ? "/close.png" : "/burger-bar.png"}
          alt="Hamburger-Menu"
          width={30}
          height={30}
        />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default NavBar;
