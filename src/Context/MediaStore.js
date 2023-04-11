import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext=createContext(null);
export default function MediaContextProvider(props){
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTvs, setTrendingTvs] = useState([]);
    const [trendingPersons, setTrendingPersons] = useState([]);
    const [page, setPage] = useState(1)

    let getTrendingItems=async(mediaType,callback,page)=>{
        let{data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=4507261fca454568e6ba45d3e6be7831&page=${page}`)
        callback(data.results);
      };
      
      useEffect(() => {
        getTrendingItems('movie',setTrendingMovies,page);
        getTrendingItems('tv',setTrendingTvs,page);
        getTrendingItems('person',setTrendingPersons,page);
      
      }, [page])

return <MediaContext.Provider value={{trendingMovies,trendingTvs,trendingPersons,setPage}}>
    {props.children}
</MediaContext.Provider>


}