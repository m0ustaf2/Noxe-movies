import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useState } from 'react';
import  axios  from 'axios';
export default function Navbar({userData,logout}) {
  const [name, setName] = useState("")
  const [trendingMovies, setMovies] = useState([])
  async function getDataFromApi(name){
    let {data}=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=67cf6dbae13ea6866f23d0336f15d01d&language=en-US&query=${name}&page=1&include_adult=false`);
    setMovies(data.results);
    console.log(trendingMovies);
  }
function search(e)
{
setName(e.target.value)
getDataFromApi(name)
}

function clearSearch(e)
{
  setName("")
}


  return (
    <>
    <nav className={`navbar position-sticky top-0 navbar-expand-lg ${styles.bgNavbar}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/Noxe-movies">
      Noxe
    
      </Link>
    <button className="navbar-toggler bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon fa-beat"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        }
           to="/Noxe-movies">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="movies">Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="tvshows">Tv shows</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="people">People</NavLink>
        </li>
      </ul>
    {/* {userData?  
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        }
           to="/Noxe-movies">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="movies">Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="tvshows">Tv shows</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="people">People</NavLink>
        </li>
      </ul>
      :''} */}

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <div className='social-media  d-flex align-items-center'>
          <a target={'_blank'} href="https://www.facebook.com/profile.php?id=100004498818792&mibextid=ZbWKwL">
          <i className='fab fa-facebook mx-2'></i>
          </a>
          <a target={'_blank'} href="https://www.linkedin.com/in/mostafa-esmail-912910218/">
          <i className='fa-brands fa-linkedin-in mx-2'></i>
          </a>
          
          <a target={'_blank'} href="https://instagram.com/mostafa_2sma3el?igshid=ZmZhODViOGI=">
          <i className='fab fa-instagram mx-2'></i>
          </a>
          <a target={'_blank'} href="https://github.com/m0ustaf2">
          <i className='fa-brands fa-github mx-2'></i>
          </a>
          
        </div>
        

        <input onChange={search} className="form-control mx-1" type="search" placeholder="Search for movies" aria-label="Search"/>

      {/* {userData?
     <li className="nav-item">
      <div className='d-flex align-items-center'>
        <input onChange={search} className="form-control mx-1" type="search" placeholder="Search for movies" aria-label="Search"/>
        <NavLink className="btn btn-outline-success me-2 " to='profile'>Hello,{userData.first_name}</NavLink>
        <NavLink className="btn btn-outline-danger nav-link me-2 p-1" to="login" onClick={logout}>
      Logout
      </NavLink>
      </div>
   </li>
     :<>
       <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>
        isActive?"bg-info rounded nav-link" : "nav-link"  
        } to="register">Register</NavLink>
        </li>
     </>
    } */}
        
     
      </ul>
    </div>
  </div>
</nav>
<div className="container">


{name?

<>
{trendingMovies.length>0? <div onClick={clearSearch} className="row py-4 gy-3">
     {trendingMovies.slice(0,20).filter(ele=> ele.poster_path !==null).map((item,index)=>(
      <div key={index} className="col-md-2">
    {  <Link className='nav-link' to={`/details/${item.id}/movie`}>
        
        <div>
            <div className="item position-relative overflow-hidden">
              <img className='w-100 rounded-2' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="movie" />
              <span className='ribbon'> 
              <i className="fa-solid fa-star mx-1"></i>
               {item.vote_average.toFixed(1)}</span>
              <div className="overlay d-flex align-items-center text-center">
                <p>{item.overview.split(' ').slice(0,10).join(' ')}</p>
              </div>
            </div>
                <div>
                  <h2 className='h6 text-center'>{item.title}{item.name}</h2>
                </div>
       </div>
            </Link>}
    </div>
    ) )}
    </div>:""}
    
</>:""}
</div>
    </>
  )
}
