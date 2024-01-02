
import back from "./assets/back.svg"
import star from "./assets/star.png"
import {useEffect, useState} from "react"
import { NavLink, useParams } from "react-router-dom"
import {API_KEY} from "./Search"

function Detail(){
    const {id} = useParams()
    const [movie, setMovie] = useState([])
    const API = import.meta.env.VITE_API_KEY
    console.log(id)

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
            console.log(movie) 
            return ()=> clearTimeout(timer)

        }, [id])

        

    return(
        <div className=" h-screen w-screen overflow-hidden bg-stone-800">
            <div className="flex justify-center mt-40 p-8">
                <div className=" w-[15%] h-96 border-r-2 border-gray-500  bg-stone-900">
                    <img className="h-[87%] w-screen text-xs" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="loading..." />
                    <div className="flex justify-between p-3 text-gray-300 mt-2">
                        <p>{movie.release_date}</p>

                        <div className="flex">
                            <img className="h-3 w-3 mt-1" src={star} alt="star" />
                            <p className="text-sm text-gray-500 ml-2">{Math.floor(movie.vote_average)}</p>
                        </div>

                    </div>

                </div>
                <div className=" relative w-1/4 h-96  px-3 rounded-r-xl bg-stone-900">
                    <h1 className="text-bold text-lg align-top text-center mt-1">{movie.title}</h1>
                    
                    <p className="text-sm mt-6">{movie.overview}</p>
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
