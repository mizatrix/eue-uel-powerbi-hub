import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroContent}>
        <span className={styles.badge}>EUE (UEL) — Power BI Projects</span>
        <h2 className={styles.title}>Welcome, EUE (UEL) Students</h2>
        <p className={styles.description}>
          Explore the Power BI student projects managed by{" "}
          <strong>Dr. Motaz Samy</strong> &amp; <strong>TA. Toka Sherif</strong>. Build, analyze,
          and master data visualization for academic excellence.
        </p>
        <div className={styles.buttons}>
          <a href="#projects" className={`${styles.btn} ${styles.primaryBtn}`}>
            Explore Projects <span><i className="fa-solid fa-arrow-down"></i></span>
          </a>
          <Link href="/login" className={`${styles.btn} ${styles.secondaryBtn}`}>
            Register Team <span><i className="fa-solid fa-users"></i></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
