"use client";
import React, { useState } from "react";
import styles from "../styles/LoginPage.module.css";
import Image from "next/image";
import Input_component from "./Input_component";
import Button_component from "./Button_component";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/components/useAuthHook";
import { toast } from "react-toastify";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
 
  const { fetchUser } = useLogin();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return toast.info("Please provide both email and password.");
      }
      if((!email.includes('@gmail.com')) || (!email.includes('@tothenew.com'))){
        return toast.info('Currently we will allowed only gmail and tothenew domain for signup/login');
      }
      const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        await fetchUser() ;
        toast.success("Login successful");
        router.push("/appointment"); 
      } else {
        toast.error(result.message || "Incorrect credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  
  const handleReset = () => {
    setEmail("");
    setPassword("");
    toast.success('Reset Successful');
  };


  return (
    <div className={styles.login}>
      <Image
        src={"./login.svg"}
        layout="fill"
        alt="login"
        height={0}
        width={0}
        className={styles.login_image}
      />
      <div className={styles.fields}>
        <div className={styles["login-type"]}>
          <h6>Admin Login</h6>
        </div>
        <section className={styles.login_section}>
          <Input_component
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            input_type="email"
            img_url="/At sign.png"
            placeholder_name="example@123.com"
            value={email}
            setValue={setEmail}
          />
          <Input_component
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            input_type="password"
            img_url="/Lock.svg"
            placeholder_name="Enter Your Password"
            isPasswordFlag={true}
            value={password}
            setValue={setPassword}
          />
          <Button_component
            text="Login"
            color="#1C4A2A"
            onClick={() => handleLogin()}
            disabled={true}
          />
          <Button_component
            text="Reset"
            color="#C6B09A"
            onClick={handleReset}
            disabled={false}
          />
          <a href="#">
            <p className={styles.forgot}>Forgot Password ?</p>
          </a>
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
