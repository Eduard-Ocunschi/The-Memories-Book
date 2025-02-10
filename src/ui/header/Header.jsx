import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../features/auth/firebase";
import { logoutUser } from "../../features/auth/userSlice";

function Header() {
  const user = useSelector((state) => state.data.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };
  return (
    <header className={styles.header}>
      <Link to="/">📔TheMemories Book</Link>

      <button onClick={handleLogout}>
        <span>{user.username}</span>
        <span>Log out </span>
      </button>
    </header>
  );
}

export default Header;
