"use client";
import { useEffect, useState } from "react";
import { isLoggedIn, loginWithEmail, registerWithEmail } from "../util/pocketbase";
import styles from "./login.module.css";
import { RedirectType, redirect } from "next/navigation";

const REGISTER_TEXT = "registrieren";
const LOGIN_TEXT = "login";
const MODE_BUTTON_LOGIN_TEXT = "Ich habe noch keinen Account";
const MODE_BUTTON_REGISTER_TEXT = "Ich schon einen Account";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [submitModeButtonText, setSubmitModeButtonText] = useState<string>(LOGIN_TEXT);

  const [registerMode, setRegisterMode] = useState<boolean>(false);

  useEffect(() => {
    isLoggedIn().then((loginResult: boolean) => loginResult && redirect("/", RedirectType.replace));
  }, []);

  const onRegisterSubmit = async () => {
    if (registerMode) {
      await registerWithEmail(email, password, passwordConfirm);
    } else {
      await loginWithEmail(email, password);
    }

    redirect("/", RedirectType.replace);
  };

  const onRegisterModeButtonClick = () => {
    setRegisterMode(!registerMode);
    setSubmitModeButtonText(registerMode ? LOGIN_TEXT : REGISTER_TEXT);
    setPasswordConfirm("");
  };

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);
  const arepasswordsEqual = password === passwordConfirm;
  const areFieldsFilled = email !== "" && password !== "" && (!registerMode || passwordConfirm !== "");

  return (
    <div className={styles.page}>
      <h1>Wilkommen</h1>
      <form className={styles.form}>
        <div>
          <label className={styles.formLabel}>Email</label>
          <input type="label" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label className={styles.formLabel}>Passwort</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        {registerMode && (
          <>
            <div className={`${styles.fadeIn} ${styles.show}`}>
              <label className={styles.formLabel}>Passwort wdh.</label>
              <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
            </div>
            <div>
              <label className={`${styles.helperTextOpen} ${hasMinLength ? styles.helperTextFullfilld : null}`}>
                Passwort muss minestens 8 Zeichen enthalten
              </label>
              <label className={`${styles.helperTextOpen} ${hasNumber ? styles.helperTextFullfilld : ""}`}>
                Passwort muss mindestens eine Zahl beinhalten
              </label>
              <label className={`${styles.helperTextOpen} ${hasSpecialChar ? styles.helperTextFullfilld : null}`}>
                Passwort muss minestens 1 Sonderzeichen enthalten
              </label>
              <label className={`${styles.helperTextOpen} ${arepasswordsEqual ? styles.helperTextFullfilld : null}`}>
                Passwörter müssen gleich sein
              </label>
            </div>
          </>
        )}
      </form>
      <div className={styles.submitArea}>
        <button className={styles.modeButton} onClick={onRegisterModeButtonClick}>
          {registerMode ? MODE_BUTTON_REGISTER_TEXT : MODE_BUTTON_LOGIN_TEXT}
        </button>
        <button
          className={styles.submitButton}
          disabled={!areFieldsFilled || (registerMode && (!hasMinLength || !hasNumber || !hasSpecialChar || !arepasswordsEqual))}
          onClick={onRegisterSubmit}
        >
          {submitModeButtonText}
        </button>
      </div>
      <div className={styles.footer}>
        <a href="datenschutz">Datenschutzerklärung</a>
        <a href="/">Home Page</a>
      </div>
    </div>
  );
}
