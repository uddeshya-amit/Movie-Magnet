import star from "./assets/star.png"
function MovieList({movie}) {
   
    return(
        <>
        <div className=" md:w-52  rounded-xl bg-stone-800 drop-shadow delay-75 transition-all hover:cursor-pointer" >
            <img className="w-52 rounded-t-xl"
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
            alt={movie.title + ' poster'}
            />
            <div className="md:h-28">
                <h1 className="text-bold text-xl text-center mt-2">
                    {movie.title}
                </h1>
            </div>
            <div className=" bottom-0 flex justify-between p-3 text-gray-300 border-t-2 border-gray-500">
                <p>{movie.release_date}</p>

                <div className="flex">
                    <img className="h-3 w-3 mt-1" src={star} alt="star" />
                    <p className="text-sm text-gray-500 ml-2"> {Math.floor(movie.vote_average)}</p>

                </div>
            </div>
            
        </div>
        </>
    )
}
export default MovieList
