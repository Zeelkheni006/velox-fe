import styles from "../styles/sidebar.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>2021 © Veloxsolution</div>
      <div>
        Crafted with <span className={styles.heart}>❤️</span> by <strong>VELOXSOLUTION</strong>
      </div>
    </footer>
  );
}
