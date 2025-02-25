import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser, setLoading } from "../features/auth/userSlice";
import { auth } from "../features/auth/firebase";
import styles from "./ProtectedLayout.module.css";
import TestSidebar from "./test_sidebar/TestSidebar";
import Spinner from "./spinner/Spinner";

function ProtectedLayout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user.user);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  console.log(navigation);

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

  if (!user) {
    return <Navigate to="/authenticate" replace />;
  }

  return (
    <div className={styles.app}>
      <TestSidebar />
      <main className={styles.main}>
        {isLoading && <Spinner />}
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
