'use client'

import { useEffect } from "react"
import styles from "@/app/styles/styles.board.module.css";
import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}:{
    error: Error & {digest?: string};
    reset: () => void;
}) {
    const router = useRouter();
    useEffect(()=>{
        console.log(error);
    },[error]);

    return (
        <div className={styles.errorContainer}>
          <h3>Failed to load anime data</h3>
          <p>Please try again later or check your internet connection</p>
          <button 
             onClick={
                () => {
                    try {
                        router.replace('/');
                        router.refresh();
                    } finally {
                        reset();
                        // Hard fallback in case router is stuck in error state
                        setTimeout(() => { if (typeof window !== 'undefined') window.location.assign('/'); }, 0);
                    }
                }
             }
            className={styles.retryButton}
          >
            Reset
          </button>
          
        </div>
      );
}