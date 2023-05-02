import React, { useContext, useEffect, useState } from 'react';
import { Offline } from 'react-detect-offline';
import { Helmet } from 'react-helmet';
import Disconnected from './../Disconnected/Disconnected';
import PaginationComp from '../Pagination/PaginationComp';
import { MediaContext } from '../../Context/MediaStore';
import Items from '../Items/Items';
import Loading from '../Loading/Loading';
import Slider from "react-slick";
import axios from 'axios';


export default function Home() {
  let{trendingMovies,trendingTvs,trendingPersons}=useContext(MediaContext)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);},[])

  var settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay:true,
    arrows:false,
    lazyLoad: true,
    cssEase: "linear",
    dots: false,
  
  };
  const [trends, settrends] = useState([])
  

  let gettrends=async()=>{
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=4507261fca454568e6ba45d3e6be7831`)
    settrends(data.results);
    // console.log(data.results);
  }

  useEffect(() => {
    gettrends()
  }, [])
  
  return (
    <>
    
   
     <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
    <Offline><Disconnected/></Offline>

    {trendingPersons.length>0?
    <>
     <div className='my-2'>
     <Slider {...settings} autoplaySpeed={3000}>
     {trends?.filter(ele=> ele.poster_path !==null ).map((item)=>{
    return  <div key={item.id}>
      
    <img  height={500} src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className='w-100  cursor-pointer slid'  />
    
  </div>
     })}
    </Slider>
     </div>
     <div className="row py-4 gy-3">
    
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
