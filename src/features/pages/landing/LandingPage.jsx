import Navigation from "../../../ui/navigation/Navigation";
import styles from "./LandingPage.module.css";
import Lootie from "lottie-react";
import animationData from "../../../../public/img/woman-reading-book-under-the-tree.json";
import CtaButton from "../../../ui/cta/CtaButton";

const LandingPage = () => {
  return (
    <header className={styles.container_hero_page}>
      <Navigation />
      <div className={styles.heading}>
        <div className={styles.heading_left}>
          <div className={styles.heading_titles}>
            <h1 className={styles.heading_primary}>
              <p className={styles.first_row}>
                Write your{" "}
                <span className={styles.memories_word}>memories</span>,
              </p>
              <p className={styles.second_row}>
                and
                <mark className={styles.scribble}>&nbsp;never forget</mark>
              </p>
              them...
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
          <Lootie animationData={animationData} loop={true} play speed={0.5} />
        </div>
      </div>
    </header>
  );
};

export default LandingPage;
