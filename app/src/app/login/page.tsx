"use client";
import { useEffect, useState } from "react";
import { loginWithEmail, registerWithEmail } from "../util/pocketbase";
import styles from "./login.module.css";

const REGISTER_TEXT = "registrieren";
const LOGIN_TEXT = "login";

const submitMode = Object.freeze({
  LOGING: "login",
  REGISTER: "register",
});

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [helperText, setHelperText] = useState<string>();
  const [submitModeButtonText, setSubmitModeButtonText] = useState<string>(LOGIN_TEXT);

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);
  const [registerMode, setRegisterMode] = useState<boolean>(false);

  useEffect(() => {
    if (!registerMode) {
      setSubmitButtonDisabled(email === "" || password === "");
    } else {
      const areValuesEmpty = email === "" || password === "" || passwordConfirm === "";
      const arePasswordDifferent = password !== passwordConfirm;

      console.log(areValuesEmpty);
      console.log(arePasswordDifferent);

      if (arePasswordDifferent && password !== "" && passwordConfirm !== "") setHelperText("Die Passwörter sind nicht gleich!");
      else setHelperText("");

      setSubmitButtonDisabled(areValuesEmpty || arePasswordDifferent);
    }
  }, [email, password, passwordConfirm, registerMode]);

  const onRegisterSubmit = async () => {
    if (registerMode) {
      registerWithEmail(email, password, passwordConfirm);
    } else {
      loginWithEmail(email, password);
    }
  };

  const onRegisterModeButtonClick = () => {
    setRegisterMode(!registerMode);
    setSubmitModeButtonText(registerMode ? LOGIN_TEXT : REGISTER_TEXT);
    setPasswordConfirm("");
  };

  return (
    <div className={styles.page}>
      <h1>Wilkommen</h1>
      <form className={styles.form}>
        <div>
          <label>Email</label>
          <input type="label" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label>Passwort</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        {registerMode && (
          <div className={`${styles.fadeIn} ${styles.show}`}>
            <label>Passwort wdh.</label>
            <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
          </div>
        )}
      </form>
      <text>{helperText}</text>
      <div className={styles.submitArea}>
        <button className={styles.modeButton} onClick={onRegisterModeButtonClick}>
          Ich habe noch keinen Account
        </button>
        <button className={styles.submitButton} disabled={isSubmitButtonDisabled} onClick={onRegisterSubmit}>
          {submitModeButtonText}
        </button>
      </div>
        <div className={styles.footer}>
            <a href="datenschutzerklaerung">Datenschutzerklärung</a>
            <a href="/">Home Page</a>
        </div>
    </div>
  );
}
