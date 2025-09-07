import Board from "./ui/board";
import List from "./ui/list";
import Navbar from "./ui/navbar";
import Search from "./ui/search";
import styles from "./styles.module.css";
import { fetchAnimePages } from "./lib/data";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAnimePages(query,currentPage);  
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
            </div>
          </div>
          <div className="col-8 d-flex flex-column p-2">
            <Board query={query} currentPage={currentPage}/>
        <div className="pagination">
          <p>Pagination goes here</p>
        </div>
          </div>
        </div> {/*anime board div} */}
       </div> {/*container div} */}
    </>
  );
}
