import { useContext } from 'react'
import ReactPaginate from 'react-paginate'
import { MediaContext } from '../../Context/MediaStore'
function PaginationComp() {
  let {setPage}=useContext(MediaContext)
  
const handlePageClick=(e)=>{
let dataa=e.selected + 1
// console.log(dataa);
setPage(dataa)
// console.log(page);


  }
  const pageCount=1000;
  
  
  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel="next>"
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<previous"
        containerClassName={"pagination  justify-content-center p-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link text-dark"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link text-info"}
        nextLinkClassName={"page-link text-info"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link text-muted"}
        activeClassName={"active"}
      />
  )
}

export default PaginationComp