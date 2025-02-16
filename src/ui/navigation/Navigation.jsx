import Logo from "../logo/Logo";
import CtaButton from "../cta/CtaButton";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.nav_container}>
      <Logo className="logo_landing_nav" />
      <CtaButton to="/jurnal" className="cta" />
    </nav>
  );
}

export default Navigation;
