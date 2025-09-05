import Image from "next/image";

export default async function Board({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  /*
  const data = await fetch("https://api.jikan.moe/v4/top/anime?limit=10");
  const results = await data.json();
 */
const data = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
const results = await data.json();
  return (
    <>
      {results?.data &&
        results.data.map((anime: any) => (
          <div
            className="borad-card border rounded-3 border-white  m-3 "
            key={anime.mal_id}
          >
            <Image
              className="w-100 mb-3"
              src={`${anime.images.jpg.large_image_url}`}
              alt={anime.title}
              width={260}
              height={400}
            />
            <p>{anime.title_english || anime.title}</p>
          </div>
        ))}
    </>
  );
}
