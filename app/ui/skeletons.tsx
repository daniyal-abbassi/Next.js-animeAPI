


import styles from "../styles.module.css";

// ===== INDIVIDUAL SKELETON CARD COMPONENT =====
function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      {/* Image skeleton */}
      <div className={styles.skeletonImageContainer}>
        <div className={styles.skeletonImage}></div>
      </div>
      
      {/* Content skeleton */}
      <div className={styles.skeletonContent}>
        {/* Title skeleton */}
        <div className={styles.skeletonTitle}></div>
        
        {/* Action links skeleton */}
        <div className={styles.skeletonActions}>
          <div className={styles.skeletonScore}></div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN SKELETON BOARD COMPONENT =====
export default function AnimeBoardSkeleton() {
  return (
    <div className={styles.animeGrid}>
      {Array.from({ length: 12 }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}