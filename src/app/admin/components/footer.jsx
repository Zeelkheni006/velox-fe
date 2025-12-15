import styles from "../styles/sidebar.module.css";
import { FcLike } from "react-icons/fc";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>2021 © Veloxsolution</div>
      <div>
        Crafted with <span className={styles.heart}><FcLike /></span> by <strong>VELOXSOLUTION</strong>
      </div>
    </footer>
  );
}
