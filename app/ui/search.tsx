"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="input-group input-group-lg">
      <span className="input-group-text" id="search-by-name">
        Search Anime
      </span>
      <input
        type="text"
        className="form-control"
        aria-label="Search anime by name"
        aria-describedby="search-by-name"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
