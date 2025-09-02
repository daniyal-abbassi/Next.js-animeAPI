import Board from "./ui/board";
import List from "./ui/list";
import Navbar from "./ui/navbar";

export default function Page() {
  return (
    <>
    <Navbar />
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-start align-items-center p-4 h4">
      <div className="anime-list border rounded-3 p-4 container-fluid d-flex flex-row justify-content-between flex-wrap">
      
      <Board />
      </div>
      
   
    </div>
    </>
  );
}
