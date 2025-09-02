import List from "./ui/list";
import Navbar from "./ui/navbar";

export default function Page() {
  return (
    <>
    <Navbar />
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-start align-items-center p-4 h4">
      
      <List />
      
   
    </div>
    </>
  );
}
