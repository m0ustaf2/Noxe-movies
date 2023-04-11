import React from 'react';
import { Helmet } from 'react-helmet';
import Movies from '../Movies/Movies';
import People from '../People/People';
import Tvshows from '../Tvshows/Tvshows';




export default function Home() {

  
  return (
    <>
    
    <Movies/>
    <Tvshows/>
    <People/>
    
  


            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
   
    </>
  )
}
