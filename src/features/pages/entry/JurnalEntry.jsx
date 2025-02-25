import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import styles from "./JurnalEntry.module.css";

function JurnalEntry() {
  const { uid } = useParams();
  console.log(uid);
  const jurnalEntry = useSelector((state) =>
    state.data.jurnal.jurnal?.find((item) => item.id === Number(uid))
  );
  console.log(jurnalEntry);

  return (
    <section className={styles.page_container}>
      <div className={styles.entry_container}>
        <h2 className={styles.entry_title}>{jurnalEntry.title}</h2>
        <div className={styles.place_date_wrapper}>
          <p className={styles.entry_place}>{jurnalEntry.place}</p>
          <p className={styles.entry_date}>{jurnalEntry.date}</p>
        </div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: jurnalEntry.poveste }}
        />
      </div>
    </section>
  );
}

export default JurnalEntry;
