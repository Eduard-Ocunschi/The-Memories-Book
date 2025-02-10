import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="/createpage">Create new Page</Link>
      <Link to="/jurnal">Your Jurnal</Link>
    </>
  );
}

export default Home;
