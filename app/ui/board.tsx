import Image from "next/image";
import styles from "../styles.module.css";

export default async function Board({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const data = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=12`);
  const results = await data.json();
  
  return (
    <div className={styles.animeGrid}>
      {results?.data &&
        results.data.map((anime: any) => (
          <div
            className={styles.animeCard}
            key={anime.mal_id}
          >
            <div className={styles.animeImageContainer}>
              <Image
                className={styles.animeImage}
                src={anime.images.jpg.image_url}
                alt={anime.title_english || anime.title}
                fill
                sizes="(max-width: 768px) 240px, 280px"
                style={{ objectFit: 'cover' }}
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
                        <span className={styles.overlayInfoValue}>{anime.type}</span>
                      </div>
                    )}
                    
                    {anime.episodes && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Episodes:</span>
                        <span className={styles.overlayInfoValue}>{anime.episodes}</span>
                      </div>
                    )}
                    
                    {anime.status && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Status:</span>
                        <span className={styles.overlayInfoValue}>{anime.status}</span>
                      </div>
                    )}
                    
                    {anime.duration && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Duration:</span>
                        <span className={styles.overlayInfoValue}>{anime.duration}</span>
                      </div>
                    )}
                    
                    {anime.rating && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Rating:</span>
                        <span className={styles.overlayInfoValue}>{anime.rating}</span>
                      </div>
                    )}
                    
                    {anime.season && anime.year && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Aired:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} {anime.year}
                        </span>
                      </div>
                    )}
                    
                    {anime.studios && anime.studios.length > 0 && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Studio:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.studios.map((studio: any) => studio.name).join(', ')}
                        </span>
                      </div>
                    )}
                    
                    {anime.members && (
                      <div className={styles.overlayInfoItem}>
                        <span className={styles.overlayInfoLabel}>Members:</span>
                        <span className={styles.overlayInfoValue}>
                          {anime.members.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {anime.genres && anime.genres.length > 0 && (
                    <div className={styles.overlayGenres}>
                      {anime.genres.slice(0, 4).map((genre: any) => (
                        <span key={genre.mal_id} className={styles.overlayGenre}>
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {anime.synopsis && (
                    <p className={styles.overlaySynopsis}>
                      {anime.synopsis}
                    </p>
                  )}
                  
                  {anime.score && (
                    <span className={styles.overlayScore}>
                      ⭐ {anime.score}/10
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className={styles.animeInfo}>
              <h3 className={styles.animeTitle}>
                {anime.title_english || anime.title}
              </h3>
              {anime.score && (
                <span className={styles.animeScore}>
                  ⭐ {anime.score}
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
