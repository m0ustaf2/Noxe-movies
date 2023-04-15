import React from 'react'
import { Link } from 'react-router-dom'

export default function Items({item}) {
  return (
    <>
     <div className="col-sm-6 col-md-4 col-xl-2 col-6">
      <Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
  <div>
      <div className="item position-relative overflow-hidden">
        {item.poster_path?
        <img className='w-100 rounded-2' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="movie" />
    :<img className='w-100 rounded-2' src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt="Actor" />}
    {item.profile_path? <div className="overlay  text-center">
           <div className='mt-5'>{item.original_name}</div>
        <div>{item.popularity.toFixed(1)}</div>
           <div>{item.known_for_department}</div>
         </div>:''}
{item.poster_path?<div className="ribbon">
<i className="fa-solid fa-star m-1"></i>
    {item.vote_average?.toFixed(1)}
</div>:""}
        <div className="overlay  d-flex align-items-center text-center">
          <p>{item.overview?.split(' ').slice(0,10).join(' ')}</p>
        </div>
      </div>
          <div>
            <h2 className='h6 text-center'>{item.title}{item.name}</h2>
          </div>
 </div>
      </Link>
    </div>
    </>
  )
}
