import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MediaContext } from '../../Context/MediaStore';
import Loading from '../Loading/Loading';
import PaginationComp from '../Pagination/PaginationComp';


export default function Tvshows() {


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);},[])
let {trendingTvs}=useContext(MediaContext)


 
  return (
    <>

    <Helmet>
                <meta charSet="utf-8" />
                <title>Tv shows</title>
                
            </Helmet>
    {!isLoading?<div className="row py-4 gy-3">
       <div className="col-md-4">
        <div>
          <div className='brdr mb-3 w-25'></div>
          <h3>Trending</h3>
          <h3>Tv</h3>
          <h3>To watch now</h3>
          <span className='text-muted'>most watched tvshows by day</span>
          <div className='brdr mt-4 w-100'></div>
        </div>
      </div> 
     {trendingTvs.slice(0,20).filter(ele=> ele.poster_path !==null ).map((item,index)=>(
      <div key={index} className="col-sm-6 col-md-4 col-xl-2 col-6">
     <Link className='nav-link' to={`/details/${item.id}/${item.media_type}`} >
   <div>
      <div className="item position-relative overflow-hidden ">
        <img className='w-100 rounded-2' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="tvshow" />
          <div className="ribbon">
<i className="fa-solid fa-star m-1"></i>
    {item.vote_average.toFixed(1)}
</div>
        <div className="overlay d-flex align-items-center text-center">
          <p>{item.overview.split(' ').slice(0,10).join(' ')}</p>
        </div>
      </div>
      <div>
      <h2 className='h6 text-center'>{item.title}{item.name}</h2>
      </div>
   </div>
     </Link>
    </div>
    ) )}
    </div>:<Loading/>}
<PaginationComp/>
  

    </>
  )
}
