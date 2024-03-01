import { useEffect, useState } from "react";
import icon from "./assets/search.svg";
import MovieList from "./MovieList";
import { NavLink } from "react-router-dom";
import Loader from "./loader";

const API_KEY = import.meta.env.VITE_API_KEY;

function Search() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const url = !query
				? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
				: `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`;

			try {
				setIsLoading(true);
				const response = await fetch(url);
				const data = await response.json();
				setMovies(data.results);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
				document.title = "Movie Magnet";
			}
		}

		let timeOut = setTimeout(() => {
			fetchData();
		}, 1000);
		return () => clearTimeout(timeOut);
	}, [query]);

	return (
		<div>
			<div className="p-4 mt-8 rounded-xl  md:w-1/2 m-auto bg-stone-800">
				<nav className="flex justify-between">
					<h1 className="md:text-2xl">Movie Magnet</h1>
					<div className="flex relative">
						<input
							className="rounded-3xl w-32 placeholder:text-transparent md:placeholder:text-gray-300 md:w-52 text-center bg-stone-800 text-sm border-2 border-white focus:outline-none "
							type="text"
							name=""
							id=""
							placeholder="Search movie..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<img
							className=" absolute h-4 md:h-6 top-1  ml-2 w-5"
							src={icon}
							alt="icon"
						/>
					</div>
				</nav>
			</div>

			<div className=" mt-10 md:mt-20 mb-10 px-24 grid gap-5 md:gap-10  md:grid-cols-3 lg:grid-cols-5 content-center justify-center ">
				{isLoading
					? Array(15).fill(<Loader />)
					: movies
							.filter((movie) => movie.poster_path)
							.map((movie) => (
								<NavLink to={`Details/${movie.id}`}>
									<MovieList key={movie.id} movie={movie} />
								</NavLink>
							))}
			</div>
		</div>
	);
}
export default Search;
