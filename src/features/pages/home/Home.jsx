import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.page_container}>
      <Link className={styles.btn_create_entry} to="/createpage">
        Write new Entry
      </Link>
      <Link className={styles.btn_to_jurnal} to="/jurnal">
        Check your Jurnal
      </Link>
    </div>
  );
}

export default Home;
