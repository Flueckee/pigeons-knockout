import { CircleUserRound } from "lucide-react";
import styles from "./navbar.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Brieftauben-Knockout</h1>
      <div className={styles.tooltip}>
        <CircleUserRound size={48} strokeWidth={1} absoluteStrokeWidth className={styles.profileIcon} />
        <span className={styles.tooltipText}>Profil bearbeiten</span>
      </div>
    </div>
  );
}
