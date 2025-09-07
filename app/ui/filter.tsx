"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "../styles.module.css";

// ===== FILTER TYPES =====
interface FilterState {
  sfw: string;
  type: string;
  status: string;
  rating: string;
  orderBy: string;
  sort: string;
}

// ===== ENHANCED FILTERS COMPONENT =====
export default function Filters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Get current filter values from URL
  const currentSfw = searchParams.get('sfw') || '';
  const currentType = searchParams.get('type') || '';
  const currentStatus = searchParams.get('status') || '';
  const currentRating = searchParams.get('rating') || '';
  const currentOrderBy = searchParams.get('order_by') || '';
  const currentSort = searchParams.get('sort') || '';

  // Debounced filter handler for better performance
  const handleFilterChange = useDebouncedCallback((filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Reset page to 1 when filters change
    params.set('page', '1');
    
    if (value && value !== '') {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }
    
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // Clear all filters
  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('sfw');
    params.delete('type');
    params.delete('status');
    params.delete('rating');
    params.delete('order_by');
    params.delete('sort');
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h4 className={styles.filtersTitle}>Filters</h4>
        <button 
          onClick={clearAllFilters}
          className={styles.clearFiltersBtn}
          type="button"
        >
          Clear All
        </button>
      </div>

      {/* SFW Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Content Rating</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="sfw"
              value="true"
              checked={currentSfw === 'true'}
              onChange={(e) => handleFilterChange('sfw', e.target.value)}
            />
            <span className={styles.radioLabel}>Safe for Work</span>
          </label>
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="sfw"
              value="false"
              checked={currentSfw === 'false'}
              onChange={(e) => handleFilterChange('sfw', e.target.value)}
            />
            <span className={styles.radioLabel}>Include Adult Content</span>
          </label>
        </div>
      </div>

      {/* Type Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Anime Type</label>
        <select
          value={currentType}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Types</option>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="special">Special</option>
          <option value="ona">ONA</option>
          <option value="music">Music</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Status</label>
        <select
          value={currentStatus}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Status</option>
          <option value="airing">Currently Airing</option>
          <option value="complete">Finished Airing</option>
          <option value="upcoming">Not Yet Aired</option>
        </select>
      </div>

      {/* Rating Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Rating</label>
        <select
          value={currentRating}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Ratings</option>
          <option value="g">G - All Ages</option>
          <option value="pg">PG - Children</option>
          <option value="pg13">PG-13 - Teens 13 or older</option>
          <option value="r17">R - 17+ (violence & profanity)</option>
          <option value="r">R+ - Mild Nudity</option>
          <option value="rx">Rx - Hentai</option>
        </select>
      </div>

      {/* Sort Options */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Sort By</label>
        <select
          value={currentOrderBy}
          onChange={(e) => handleFilterChange('order_by', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Default</option>
          <option value="title">Title</option>
          <option value="type">Type</option>
          <option value="rating">Rating</option>
          <option value="start_date">Start Date</option>
          <option value="end_date">End Date</option>
          <option value="episodes">Episodes</option>
          <option value="score">Score</option>
          <option value="scored_by">Scored By</option>
          <option value="rank">Rank</option>
          <option value="popularity">Popularity</option>
          <option value="members">Members</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>

      {/* Sort Direction */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Sort Direction</label>
        <select
          value={currentSort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
