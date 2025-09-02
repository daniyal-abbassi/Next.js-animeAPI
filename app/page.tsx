import Navbar from "./ui/navbar";

export default function Page() {
  return (
    <>
    <Navbar />
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-start align-items-center p-4 h4">
      
      <ul className="list-group p-4">
        <li className="list-group-item">anime -1</li>
        <li className="list-group-item">anime -2</li>
        <li className="list-group-item">anime -3</li>
      </ul>
      
   
    </div>
    </>
  );
}
