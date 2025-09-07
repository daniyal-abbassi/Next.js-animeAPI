import Board from "./ui/board";
import List from "./ui/list";
import Navbar from "./ui/navbar";
import Search from "./ui/search";
import styles from "./styles.module.css";
import { fetchAnimePages } from "./lib/data";
import Pagination from "./ui/pagination";
import { Suspense } from "react";
import AnimeBoardSkeleton from "./ui/skeletons";
import Filters from "./ui/filter";

// ===== ENHANCED PAGE COMPONENT WITH OPTIMIZED STREAMING =====
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  // Fetch total pages in parallel with the main content
  const totalPagesPromise = fetchAnimePages(query, currentPage);
  
  return (
    <>
      <Navbar />
      <div className={`container-fluid min-vh-100 d-flex flex-column justify-content-start align-items-center p-4 ${styles.containerFluid}`}>
        <div className={styles.searchBox}>
          <Search placeholder="Search By Name..." />
        </div>
        <div className={`row ${styles.animeList} p-4 container-fluid`}>
          <div className="col-3 p-3 mx-4">
            <div className={styles.filterBox}>
              <p className="h4">FILTERS GOES HERE</p>
              <Filters />
            </div>
          </div>
          <div className="col-8 d-flex flex-column p-2">
            {/* Optimized Suspense boundary for instant skeleton display */}
            <Suspense 
              fallback={<AnimeBoardSkeleton />}
              key={`${query}-${currentPage}`} // Force re-render on search/pagination
            >
              <Board query={query} currentPage={currentPage}/>
            </Suspense>
            
            {/* Pagination with its own Suspense boundary */}
            <Suspense fallback={<div className={styles.paginationSkeleton}></div>}>
              <PaginationWrapper totalPagesPromise={totalPagesPromise} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

// ===== PAGINATION WRAPPER COMPONENT =====
async function PaginationWrapper({ 
  totalPagesPromise 
}: { 
  totalPagesPromise: Promise<number> 
}) {
  const totalPages = await totalPagesPromise;
  return <Pagination totalPage={totalPages} />;
}
