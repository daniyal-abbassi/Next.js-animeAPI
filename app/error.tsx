'use client'

import { useEffect } from "react"
import styles from "@/app/styles/styles.board.module.css";

export default function Error({
    error,
    reset,
}:{
    error: Error & {digest?: string};
    reset: () => void;
}) {
    useEffect(()=>{
        console.log(error);
    },[error]);

    return (
        <div className={styles.errorContainer}>
          <h3>Failed to load anime data</h3>
          <p>Please try again later or check your internet connection</p>
          <button 
             onClick={
                () => reset()
             }
            className={styles.retryButton}
          >
            Reset
          </button>
          
        </div>
      );
}