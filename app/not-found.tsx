import styles from "@/app/styles/styles.board.module.css";
import Link from "next/link";

export default function NotFound() {
  
    return (
        <div className={styles.errorContainer}>
          <h3>Failed to load anime data</h3>
          <p>Please try again later or check your internet connection</p>
          <Link 
             href="/"
            className={styles.retryButton}
          >
            Reset
          </Link>
          
        </div>
      );
}