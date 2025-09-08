


import skeletonStyles from "../styles/styles.skeleton.module.css";
import boardStyles from "../styles/styles.board.module.css";

// ===== INDIVIDUAL SKELETON CARD COMPONENT =====
function SkeletonCard() {
  return (
    <div className={skeletonStyles.skeletonCard}>
      {/* Image skeleton */}
      <div className={skeletonStyles.skeletonImageContainer}>
        <div className={skeletonStyles.skeletonImage}></div>
      </div>
      
      {/* Content skeleton */}
      <div className={skeletonStyles.skeletonContent}>
        {/* Title skeleton */}
        <div className={skeletonStyles.skeletonTitle}></div>
        
        {/* Action links skeleton */}
        <div className={skeletonStyles.skeletonActions}>
          <div className={skeletonStyles.skeletonScore}></div>
          <div className={skeletonStyles.skeletonButton}></div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN SKELETON BOARD COMPONENT =====
export default function AnimeBoardSkeleton() {
  return (
    <div className={boardStyles.animeGrid}>
      {Array.from({ length: 12 }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}