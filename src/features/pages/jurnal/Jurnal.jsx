import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageData, removePageData } from "../../db/firestore";
import styles from "./Jurnal.module.css";
import Map from "../../../ui/map/Map";
import { store } from "../../../store";
import { setJurnal } from "./jurnalSlice";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

function Jurnal() {
  // const [jurnalState, setJurnalState] = useState("");
  const userData = useSelector((state) => state.data.user);
  const jurnalSliceData = useSelector((state) => state.data.jurnal);
  const jurnalState = useSelector((state) => state.data.jurnal.jurnal);
  console.log(jurnalState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getData = async () => {
  //     if (userData?.user?.uid)
  //       try {
  //         const pages = await getPageData(userData.user.uid);
  //         setJurnalState(pages);
  //       } catch (error) {
  //         console.error("Error fatching jurnal", error);
  //       }
  //   };
  //   getData();
  // }, [userData]);

  function handleOnClickPage(id) {
    navigate(`/jurnal/entry/${id}`);
  }

  async function handleDeleteIEntry(event, obj) {
    event.stopPropagation();

    try {
      await removePageData(userData.user.uid, obj);
      const updatedJurnal = jurnalState.filter((entry) => entry.id !== obj.id);
      // setJurnalState(updatedJurnal);

      dispatch(setJurnal(updatedJurnal));
    } catch (error) {
      console.error("Entry delete failed:", error);
    }
  }

  return (
    <section className={styles.page_container}>
      <div className={styles.container_main}>
        <div className={styles.container_left}>
          {jurnalState.length > 0 ? (
            <ul className={styles.jurnal_list}>
              {jurnalState.map((entry, index) => (
                <li
                  key={entry.id}
                  onClick={() => handleOnClickPage(entry.id)}
                  className={`${styles.jurnal_list_item} ${
                    styles[`tilt_${entry.tiltNr}`]
                  } ${styles[`color_${entry.colorNr}`]}`}
                >
                  <p>
                    Entry {index + 1}. {entry.title} - {entry.place}
                  </p>

                  <FaTrashCan
                    onClick={(event) => handleDeleteIEntry(event, entry)}
                    className={styles.item_delete_btn}
                  />
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className={styles.container_right}>
          <Map data={jurnalSliceData} zoom="5" />
        </div>
      </div>
    </section>
  );
}

export async function loader() {
  const state = store.getState();
  const userId = state.data.user?.user?.uid;

  if (!userId) {
    return null;
  }

  try {
    const jurnalData = await getPageData(userId);
    store.dispatch(setJurnal(jurnalData));
    return jurnalData;
  } catch (error) {
    console.error("Error fetching jurnal:", error);
    return null;
  }
}
export default Jurnal;
