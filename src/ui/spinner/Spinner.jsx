import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.book}>
        <div className={styles.inner}>
          <div className={styles.left}></div>
          <div className={styles.middle}></div>
          <div className={styles.right}></div>
        </div>
        <ul>
          {[...Array(18)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Spinner;
