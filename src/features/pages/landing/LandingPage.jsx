// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import Navigation from "../../../ui/navigation/Navigation";
import styles from "./LandingPage.module.css";
import Lootie from "lottie-react";
import animationData from "../../../../public/img/woman-reading-book-under-the-tree (1).json";
import CtaButton from "../../../ui/cta/CtaButton";

const LandingPage = () => {
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.data.user.user);

  // const handleGetStarted = () => {
  //   if (user) {
  //     navigate("/home");
  //   } else {
  //     navigate("/authenticate");
  //   }
  // };

  return (
    <header className={styles.container_hero_page}>
      <Navigation />
      <div className={styles.heading}>
        <div className={styles.heading_left}>
          <div className={styles.heading_titles}>
            <h1 className={styles.heading_primary}>
              <p>
                Write your{" "}
                <span className={styles.memories_word}>memories</span>, and
                <mark className={styles.scribble}>&nbsp;never forget</mark>
                <br />
                them...
              </p>
            </h1>
            <h2 className={styles.heading_secondary}>
              <ul className={styles.bulletList}>
                <li>What you write down, will never be lost.</li>
                <li>
                  Create your own memories bookmarks, and catch every moment in
                  a page.
                </li>
              </ul>
            </h2>
          </div>
          <CtaButton className={"ctaHero"} />
        </div>
        <div className={styles.heading_right}>
          <Lootie animationData={animationData} loop={true} />
        </div>
      </div>
    </header>
  );
};

export default LandingPage;
