import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MediaContext } from '../../Context/MediaStore';
import Loading from '../Loading/Loading';
import PaginationComp from '../Pagination/PaginationComp';
import Items from '../Items/Items';




export default function People() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);},[])

let {trendingPersons}=useContext(MediaContext)
  return (
    
   <>
   
   <Helmet>
                <meta charSet="utf-8" />
                <title>People</title>
                
            </Helmet>
   {!isLoading?<div className="row py-4 gy-3">

       <div className="col-md-4">
        <div>
          <div className='brdr mb-3 w-25'></div>
          <h3>Trending</h3>
          <h3>People</h3>
          <h3>To watch now</h3>
          <span className='text-muted'>most watched people by day</span>
          <div className='brdr mt-4 w-100'></div>
        </div>
      </div> 
     {trendingPersons.slice(0,20).filter(ele=> ele.profile_path !==null ).map((item,index)=>(
          <Items item={item} key={index}/>

    ) )}
  <PaginationComp/>

    </div>:<Loading/>}
  

   </>
  )
}
