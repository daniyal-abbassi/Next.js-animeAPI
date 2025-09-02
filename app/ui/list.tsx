

export default async function List() {
  const data = await fetch("https://api.jikan.moe/v4/top/anime?limit=10");
  const results = await data.json();
//   console.log('this results: ',results.data[0].title_english)
  return (
    <ul className="list-group p-4">
        {results?.data && results.data.map((anime: any) => (
            <li className="list-group-item" key={anime.mal_id}>{anime.title_english || anime.title}</li>

        ))}
    </ul>
  );
}
