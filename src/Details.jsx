
import back from "./assets/back.svg"
import star from "./assets/star.png"
import {useEffect, useState} from "react"
import { NavLink, useParams } from "react-router-dom"
import {API_KEY} from "./Search"

function Detail(){
    const {id} = useParams()
    const [movie, setMovie] = useState([])
    const API = import.meta.env.VITE_API_KEY

    async function fetchData(){
        let url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_KEY}`
        
        try {
            const response = await fetch(url);
            const data  = await response.json();
            setMovie(data)
            
        }catch(err){
            console.error(err);
        }
     }
        useEffect(()=>{ 
            let timer = setTimeout(()=>{
                fetchData() 
            },700) 
            return ()=> clearTimeout(timer)

        }, [id])

        

    return(
        <div className=" h-screen w-screen overflow-hidden bg-stone-800">
            <div className="flex justify-center mt-40 p-8">
                <div className="w-[45%] h-70  md:w-[15%] md:h-96 h-72 border-r-2 border-gray-500  bg-stone-900">
                    <img className="h-[80%]  md:h-[87%] sm:w-screen text-xs" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="loading..." />
                    <div className="flex justify-between p-3 text-gray-300 mt-2">
                        <p className=" md:text-base">{movie.release_date}</p>

                        <div className="flex">
                            <img className=" hidden  md:block md:h-[63%] md:w-4 md:mt-1" src={star} alt="star" />
                            <p className="hidden md:block md:text-base md:text-gray-500 ml-2">{Math.floor(movie.vote_average)}</p>
                        </div>

                    </div>

                </div>
                <div className=" relative w-[60%] h-72 md:w-1/4 md:h-96 mt-0 px-3 sm:rounded-r-xl bg-stone-900">
                    <h1 className="text-sm text-bold md:text-lg align-top text-center mt-1">{movie.title}</h1>
                    
                    <p className="text-xs mt-2  md:text-sm md:mt-6">{movie.overview}</p>
                    <NavLink to={`/`}>
                        <div className="absolute left-[91%] top-[91%]  hover:cursor-pointer">
                            <img className=" transition-all delay-75 hover:scale-125"  src={back} alt="" />
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Detail
