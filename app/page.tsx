import Board from "./ui/board";
import List from "./ui/list";
import Navbar from "./ui/navbar";
import Search from "./ui/search";

export default function Page() {
  return (
    <>
    <Navbar />
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-start align-items-center p-4 h4">
      <div className="search-box">
        <Search placeholder="Search By Name..." />
      </div>
      <div className="row anime-list  p-4 container-fluid">
      <div className="col-4  border border-primary p-3 mx-4">
      <div className="filter-box">
        <p className="text-bg-warning h4">FILTERS GOES HERE</p>
      </div>
      </div>
      <div className="col-7 border rounded-3 d-flex flex-row justify-content-between flex-wrap">
        
      <Board />

        
      </div>
      </div>
      
   
    </div>
    </>
  );
}
