import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPageData } from "../../db/firestore";

function Jurnal() {

  const userData = useSelector(state => state.data.user);
  console.log(userData.user.uid);

  useEffect(() => {
    getPageData(userData.user.uid)
  }, [userData])

  return <div>Jurnal</div>;
}

export default Jurnal;
