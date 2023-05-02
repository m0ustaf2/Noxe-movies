import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { MediaContext } from '../../Context/MediaStore';

export default function Details() {
  let{trendingMovies,trendingTvs,trendingPersons}=useContext(MediaContext)

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay:true,
    arrows:false
  };
  const [itemDetails, setItemDetails] = useState('')
  let params=useParams();

  let getItemDetails=async()=>{
    let {data}=await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=4507261fca454568e6ba45d3e6be7831&language=en-US`)
    setItemDetails(data);
  }

  useEffect(() => {
   getItemDetails()
  }, [])
  
  return (
   <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Details</title>
                
            </Helmet>
   {itemDetails ? <div className="row py-4">
      <div className="col-md-4">
       {params.mediaType=='person'?
       <img className='w-100 rounded-2 '  src={`https://image.tmdb.org/t/p/original${itemDetails.profile_path}`} alt="" /> :
       <img className='w-100  rounded-2'  src={`https://image.tmdb.org/t/p/original${itemDetails.poster_path}`} alt="" />
      }
      </div>
      <div className="col-md-8">
        <>
        {params.mediaType=='person'?
        <>
        <h2>{itemDetails.title}{itemDetails.name}</h2>
        <p className='text-muted my-3'>{itemDetails.overview}{itemDetails.biography}</p>
        {itemDetails.homepage?<Link target='_blank' to={itemDetails.homepage}>
         <button className='btn btn-outline-success mx-2'>See,more</button>
         </Link>:""}
         <Link className="navbar-brand" to="/">
      <button className='btn btn-outline-info'>Return to Home</button>
      </Link>
      <div className='my-3'>
     <Slider {...settings} autoplaySpeed={3000}>
     {trendingPersons.filter(ele=> ele.profile_path !==null ).map((item)=>{
    return  <div key={item.id}>
      
    <img height={300}  src={`https://image.tmdb.org/t/p/original${item.profile_path}`} className='w-100 cursor-pointer '  />
    
  </div>
     })}
    </Slider>
     </div>
         </>:
        <>
         <h2>{itemDetails.title}{itemDetails.name}</h2>
        <p className='text-muted my-3'>{itemDetails.tagline}</p>
        {itemDetails.genres.map((item,index)=><span key={index} className='badge bg-info p-2 mx-2'>{item.name}</span>)}
        
          <p className='mt-4'>
           Vote : {itemDetails.vote_average.toFixed(1)}
          </p>
          <p>
           Voute count : {itemDetails.vote_count}
          </p>
          <p>
           Popularity : {itemDetails.popularity}
          </p>
          <p>
          Release date :  {itemDetails.release_date} {itemDetails.first_air_date}
          </p>
        
        <p className='text-muted my-3'>{itemDetails.overview}</p>
       
         <Link className="navbar-brand" to="/Noxe-movies">
      <button className='btn btn-outline-info'>Return to Home</button>
      </Link>
      {itemDetails.homepage?<Link target='_blank' to={itemDetails.homepage}>
         <button className='btn btn-outline-success mx-2'> More <i className="fa-solid fa-arrow-right"></i></button>
         </Link>
         
         :""}
          <div className='my-3'>
     <Slider {...settings} autoplaySpeed={3000}>
     {trendingMovies.map((item)=>{
    return  <div key={item.id}>
      
    <img  src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className='w-100 slid'  />
    
  </div>
     })}
    </Slider>
     </div>
        </>
        }
        </>
        
      </div>
    </div>:<Loading/> }
   </>
  )
}
