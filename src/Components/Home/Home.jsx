import React, { useContext } from 'react';
import { Offline } from 'react-detect-offline';
import { Helmet } from 'react-helmet';
import Disconnected from './../Disconnected/Disconnected';
import PaginationComp from '../Pagination/PaginationComp';
import { MediaContext } from '../../Context/MediaStore';
import Items from '../Items/Items';
import Loading from '../Loading/Loading';


export default function Home() {
  let{trendingMovies,trendingTvs,trendingPersons}=useContext(MediaContext)

  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
    <Offline><Disconnected/></Offline>


    {trendingPersons.length>0?
    <> <div className="row py-4 gy-3">
    <div className="col-md-4">
     <div>
       <div className='brdr mb-3 w-25'></div>
       <h3>Trending</h3>
       <h3>Movies</h3>
       <h3>To watch now</h3>
       <span className='text-muted'>most watched movies by day</span>
       <div className='brdr mt-4 w-100'></div>
     </div>
   </div> 
  {trendingMovies.slice(0,20).filter(ele=> ele.poster_path !==null ).map((item,index)=>(
  <Items item={item} key={index} />
 ) )}
 </div>  
 
 <div className="row py-4 gy-3">
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
  <Items item={item} key={index}/>
 ) )}
 </div>


 <div className="row py-4 gy-3">
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
 </div>
</>:<Loading/>}
<PaginationComp/>


           
   
    </>
  )
}
