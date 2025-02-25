import { useState } from "react";
import { changeUsername } from "../../db/firestore";
import styles from "./Settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../../auth/userSlice";
function Setting() {
  const [newUsername, setNewUsername] = useState("");
  const dispatch = useDispatch();
  const username = useSelector((state) => state.data.user.user.username);
  console.log(username);

  const handleChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await changeUsername(newUsername);
    dispatch(setUsername(newUsername));
  };
  return (
    <section className={styles.page_container}>
      <div className={styles.input_container}>
        <label htmlFor="username">Change Username:</label>
        <input
          type="text"
          id="username"
          placeholder="New Username"
          value={newUsername}
          onChange={handleChange}
        />
        <button className={styles.username_change_btn} onClick={handleSubmit}>
          Change
        </button>
      </div>
    </section>
  );
}

export default Setting;
