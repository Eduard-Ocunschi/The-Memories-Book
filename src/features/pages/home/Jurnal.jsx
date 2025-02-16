import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPageData } from "../../db/firestore";

function Jurnal() {
  const [jurnal, setJurnal] = useState("");
  const userData = useSelector((state) => state.data.user);
  console.log(jurnal);

  useEffect(() => {
    const getData = async () => {
      if (userData?.user?.uid)
        try {
          const pages = await getPageData(userData.user.uid);
          setJurnal(pages);
        } catch (error) {
          console.error("Error fatching jurnal", error);
        }
    };
    getData();
  }, [userData]);

  return (
    <div>
      <div>
        {jurnal.length > 0 ? (
          <ul>
            {jurnal.map((entry) => (
              <li key={entry.id}>
                {entry.title} - {entry.place}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      {jurnal.length > 0 ? (
        jurnal.map((entry, index) => (
          <div key={index} className="ql-editor">
            <h2>
              {entry.title} - {entry.place}
            </h2>
            <p>{entry.date}</p>
            <div dangerouslySetInnerHTML={{ __html: entry.poveste }} />
          </div>
        ))
      ) : (
        <p>No journal entries found.</p>
      )}
    </div>
  );
}

export default Jurnal;
