import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ to = "/", className = "", children = "The Memories Book" }) {
  return (
    <Link to={to} className={`${styles[className]}`}>
      {children}
    </Link>
  );
}

export default Logo;
