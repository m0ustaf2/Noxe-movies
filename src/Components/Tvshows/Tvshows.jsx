import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MediaContext } from '../../Context/MediaStore';
import Loading from '../Loading/Loading';
import PaginationComp from '../Pagination/PaginationComp';
import Items from '../Items/Items';


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
     <Items item={item} key={index} />
     
    ) )}
    </div>:<Loading/>}
<PaginationComp/>
  

    </>
  )
}
