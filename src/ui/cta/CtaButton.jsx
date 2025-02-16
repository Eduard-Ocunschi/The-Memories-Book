import { Link } from "react-router-dom";
import styles from "./CtaButton.module.css";

function CtaButton({ to = "/home", className = "", children = "Get Started" }) {
  return (
    <Link to={to} className={`${styles[className]}`}>
      {children}
    </Link>
  );
}

export default CtaButton;
