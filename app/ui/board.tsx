import Image from "next/image";
import styles from "../styles.board.module.css";

// ===== ANIME DATA INTERFACE =====
interface AnimeData {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  type?: string;
  episodes?: number;
  status?: string;
  duration?: string;
  rating?: string;
  season?: string;
  year?: number;
  studios?: Array<{ name: string }>;
  members?: number;
  genres?: Array<{ mal_id: number; name: string }>;
  synopsis?: string;
  score?: number;
  trailer?: {
    youtube_id: string;
  };
  url?: string;
}

interface ApiResponse {
  data: AnimeData[];
  pagination?: {
    last_visible_page: number;
  };
}


export default async function Board({
  query,
  currentPage,
  sfw,
  type,
  status,
  rating,
  orderBy,
  sort
}: {
  query: string;
  currentPage: number;
  sfw: string;
  type: string;
  status: string;
  rating: string;
  orderBy: string;
  sort: string;
}) {
  // Add error handling and timeout for better streaming experience
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    // Build query parameters dynamically
    const queryParams = new URLSearchParams();
    
    if (query) queryParams.set('q', query);
    if (sfw) queryParams.set('sfw', sfw);
    if (type) queryParams.set('type', type);
    if (status) queryParams.set('status', status);
    if (rating) queryParams.set('rating', rating);
    if (orderBy) queryParams.set('order_by', orderBy);
    if (sort) queryParams.set('sort', sort);
    
    queryParams.set('limit', '12');
    queryParams.set('page', currentPage.toString());

    const data = await fetch(
      `https://api.jikan.moe/v4/anime?${queryParams.toString()}`,
      {
        signal: controller.signal,
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!data.ok) {
      throw new Error(`API request failed: ${data.status}`);
    }
    
    const results: ApiResponse = await data.json();

    return (
      <div className={styles.animeGrid}>
        {results?.data && results.data.length > 0 ? (
          results.data.map((anime: AnimeData) => (
          <div className={styles.animeCard} key={anime.mal_id}>
            <div className={styles.animeImageContainer}>
              <Image
                className={styles.animeImage}
                src={anime.images.jpg.image_url}
                alt={anime.title_english || anime.title}
                fill
                sizes="(max-width: 768px) 240px, 280px"
                style={{ objectFit: "cover" }}
              />

              {/* Hover Overlay with Anime Information */}
              <div className={styles.animeOverlay}>
                <div className={styles.overlayContent}>
                  <h3 className={styles.overlayTitle}>
                    {anime.title_english || anime.title}
                  </h3>

                  <div className={styles.overlayInfo}>
                    {anime.type && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Type:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.type}
                        </span>
                      </div>
                    )}

                    {anime.episodes && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>
                          Episodes:
                        </span>
                        <span className={styles.overlayInfoValue}>
                          {anime.episodes}
                        </span>
                      </div>
                    )}

                    {anime.status && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Status:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.status}
                        </span>
                      </div>
                    )}

                    {anime.duration && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>
                          Duration:
                        </span>
                        <span className={styles.overlayInfoValue}>
                          {anime.duration}
                        </span>
                      </div>
                    )}

                    {anime.rating && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Rating:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.rating}
                        </span>
                      </div>
                    )}

                    {anime.season && anime.year && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Aired:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.season.charAt(0).toUpperCase() +
                            anime.season.slice(1)}{" "}
                          {anime.year}
                        </span>
                      </div>
                    )}

                    {anime.studios && anime.studios.length > 0 && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Studio:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.studios
                            .map((studio) => studio.name)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    {anime.members && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>
                          Members:
                        </span>
                        <span className={styles.overlayInfoValue}>
                          {anime.members.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {anime.genres && anime.genres.length > 0 && (
                    <div className={styles.overlayGenres}>
                      {anime.genres.slice(0, 4).map((genre) => (
                        <span
                          key={genre.mal_id}
                          className={styles.overlayGenre}
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {anime.synopsis && (
                    <p className={styles.overlaySynopsis}>{anime.synopsis.slice(0,300)} .... </p>
                  )}

                  <div className={styles.actionLinks}>
                    {anime.score && (
                      <span className={styles.overlayScore}>
                        ⭐ {anime.score}/10
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.animeInfo}>
              <h3 className={styles.animeTitle}>
                {anime.title_english || anime.title}
              </h3>
              <div className={styles.actionLinks}>
                {anime.score && (
                  <span className={styles.animeScore}>⭐ {anime.score}</span>
                )}

                {anime.trailer?.youtube_id && (
                  <a
                    href={`https://www.youtube.com/watch?v=${anime.trailer.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionLinkY}
                  >
                    <svg className={styles.youtubeIcon} viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Trailer
                  </a>
                )}

                {anime.url && (
                  <a
                    href={anime.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionLinkMal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#1c71d8"
                    >
                      <path
                        fill="#1c71d8"
                        d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404l-1.989-2.458l-.02 5.285H.001L0 7.247h2.203l1.865 2.545l2.015-2.546l2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779c.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687c.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033l.038-1.81h2.309zm3.992-2.099v6.627l3.107.032l-.43 1.775h-4.807V7.187l2.13.03z"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))
        ) : (
          <div className={styles.noResults}>
            <h3>No anime found for "{query}"</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Error fetching anime data:', error);
    
    return (
      <div className={styles.errorContainer}>
        <h3>Failed to load anime data</h3>
        <p>Please try again later or check your internet connection</p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }
}
