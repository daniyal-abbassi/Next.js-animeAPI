import Board from "./ui/board";
import List from "./ui/list";
import Navbar from "./ui/navbar";

export default function Page() {
  return (
    <>
    <Navbar />
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-start align-items-center p-4 h4">
      <div className="search-box">
        <h2 className="rounded-pill p-3 bg-primary">THIS IS(gonna be) SEARCH BOX HERE!!!!!</h2>
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
