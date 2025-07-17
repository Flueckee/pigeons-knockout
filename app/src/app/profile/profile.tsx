"use client";
import { useState } from "react";
import Header from "../components/Header/Header";
import Textfield from "../components/Textfield/Textfield";
import styles from "./profile.module.css";
import { CircleUserRound } from "lucide-react";
export default function Profile() {
  const [firstname, setFirstname] = useState<string>("");

  return (
    <>
      <Header navType="home"/>
      <div className={styles.container}>
        <SubHeader />
        <UserData />
      </div>
    </>
  );
}

const SubHeader = () => (
  <div className={styles.subHeader}>
    <CircleUserRound size={128} />
  </div>
);

const UserData = () => {
  const [firstname, setFirstname] = useState<string>("");

  return (
    <>
      <h1>Profil</h1>
      <form className={styles.userContainer}>
        <Textfield value={firstname} onInputChange={setFirstname} type="label" label="Vorname" />
        <Textfield value={firstname} onInputChange={setFirstname} type="label" label="Nachname" />
        <Textfield value={firstname} onInputChange={setFirstname} type="label" label="E-mail" />
        <Textfield value={firstname} onInputChange={setFirstname} type="label" label="Telefonnummer" />
      </form>
    </>
  );
};
