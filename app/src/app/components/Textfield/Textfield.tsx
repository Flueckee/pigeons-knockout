import styles from "./textfield.module.css";

interface TextfieldProps {
  value: string;
  onInputChange: (p: string) => void;
  type: string;
  label: string;
}

export default function Textfield(props: TextfieldProps) {
  return (
    <div className={styles.formDiv}>
      <label className={styles.formLabel}>{props.label}</label>
      <input
        className={styles.textfield}
        value={props.value}
        type={props.type}
        onChange={(event) => props.onInputChange(event.target.value)}
      />
    </div>
  );
}
