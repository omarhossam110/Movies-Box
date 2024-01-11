import { HashLink } from "react-router-hash-link";

export default function Pagination({paginate}) {
  
  let pageNumbers = new Array(10).fill("x").map((el, i) => i + 1);

  return (
    <>
      <nav aria-label="Page navigation example" className="d-flex justify-content-center mb-4 mt-5 ms-5">
        <ul className="pagination">
          {pageNumbers.map((number, index) => (
            <li className="page-item" key={index} style={{cursor:"pointer"}}>
              <HashLink  to={`#P${number}`} onClick={()=> paginate(number)} className="page-link" style={{fontSize:"2rem", padding:".5rem 3rem"}}>
                {number} 
              </HashLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
