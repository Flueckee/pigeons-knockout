"use client"
import { CircleUserRound, House } from "lucide-react";
import styles from "./navbar.module.css";
import { redirect } from "next/navigation";


interface HeaderProps {
  navType: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div className={styles.header}>
      <h1>Meisenrennen</h1>
      {props.navType == "home" ? <HomeIconnn /> : props.navType == "profile" ? <ProfileIcon /> : <></>}
    </div>
  );
}

const ProfileIcon = () => (
  <div className={styles.tooltip}>
    <span className={styles.tooltipText}>Profil bearbeiten</span>
    <CircleUserRound onClick={() => redirect("/profile")} size={48} strokeWidth={1} absoluteStrokeWidth className={styles.profileIcon} />
  </div>
);


const HomeIconnn = () => (
  <div className={styles.tooltip}>
    <span className={styles.tooltipText}>zur Tabelle</span>
    <House onClick={() => redirect("/")} size={48} strokeWidth={1} absoluteStrokeWidth className={styles.profileIcon} />
  </div>
);