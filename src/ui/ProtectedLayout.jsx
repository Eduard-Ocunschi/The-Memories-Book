import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header/Header";
import { useEffect } from "react";
import { loginUser, setLoading } from "../features/auth/userSlice";
import { auth } from "../features/auth/firebase";
import styles from "./ProtectedLayout.module.css";

function ProtectedLayout() {
  const dispatch = useDispatch();

  // NU SE ACTIVEAZA USE EFFECTUL
  useEffect(() => {
    console.log("effect triggered");
    auth.onAuthStateChanged((authUser) => {
      console.log("Auth state changed:", authUser);
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.log("User is not logged in.");
      }
    });
  }, []);

  const user = useSelector((state) => state.data.user.user);

  if (!user) {
    return <Navigate to="/authenticate" replace />;
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
