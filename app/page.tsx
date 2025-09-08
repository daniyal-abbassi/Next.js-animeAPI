import Board from "./ui/board";
import Navbar from "./ui/navbar";
import Search from "./ui/search";
import styles from "./styles/styles.module.css"
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
    sfw?: string;
    type?: string;
    status?: string;
    rating?: string;
    order_by?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const sfw = searchParams?.sfw || '';
  const type = searchParams?.type || '';
  const status = searchParams?.status || '';
  const rating = searchParams?.rating || '';
  const orderBy = searchParams?.order_by || '';
  const sort = searchParams?.sort || '';
  
  // Fetch total pages in parallel with the main content
  const totalPagesPromise = fetchAnimePages(query, currentPage, {
    sfw,
    type,
    status,
    rating,
    orderBy,
    sort
  });
  
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
              <Filters />
            </div>
          </div>
          <div className="col-8 d-flex flex-column p-2">
            {/* Optimized Suspense boundary for instant skeleton display */}
            <Suspense 
              fallback={<AnimeBoardSkeleton />}
              key={`${query}-${currentPage}-${sfw}-${type}-${status}-${rating}-${orderBy}-${sort}`} // Force re-render on any filter change
            >
              <Board 
                query={query} 
                currentPage={currentPage} 
                sfw={sfw}
                type={type}
                status={status}
                rating={rating}
                orderBy={orderBy}
                sort={sort}
              />
            </Suspense>
            
            {/* Pagination with its own Suspense boundary */}
            <Suspense 
              fallback={<div className={styles.paginationSkeleton}></div>}
              key={`pagination-${query}-${currentPage}-${sfw}-${type}-${status}-${rating}-${orderBy}-${sort}`}
            >
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
