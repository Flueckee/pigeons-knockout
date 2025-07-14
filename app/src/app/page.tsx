import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Welcome to Next.js!</h1>
      <p>
        Get started by editing <code>src/app/page.tsx</code>.
      </p>
      <button className={styles.button}>Hello World!</button>
    </div>
  );
}
