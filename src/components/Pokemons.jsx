import { IconMoon, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import usePokemonContext from "../hooks/usePokemonContext";
import PokemonList from "./PokemonList";

const INITIAL_LIMIT = 40;
const INCREASE_LIMIT = 20;

const Pokemons = () => {
	const [allPokemons, setAllPokemons] = useState([]);
	const [pokemonName, setPokemonName] = useState("");
	const [limit, setLimit] = useState(INITIAL_LIMIT);
	const { setInitialPokemonLoading } = usePokemonContext();
	const [theme, setTheme] = useState(()  => {

		if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return "dark"
		}
		else{
			return "light"
		}
	});

	// Observer para el span del fondo para saber si se esta viendo o no
	const targetObserver = useRef(null);
	const entry = useIntersectionObserver(targetObserver, {});
	const isVisible = !!entry?.isIntersecting;

	// FUNCTIONS ----------------------------------------------
	const pokemonsByNames = allPokemons.filter((pokemon) =>
		pokemon.name.includes(pokemonName),
	);

	const toggleDarkMode = () => {
		setTheme( theme === "light" ? "dark" : "light")
		
	};

	const handleChangePokemonName = (e) => {
		setPokemonName(e.target.value.toLowerCase());
	};

	// USE EFFECTS ----------------------------------------------
	useEffect(() => {
		axios
			.get("https://pokeapi.co/api/v2/pokemon?limit=898")
			.then((response) => setAllPokemons(response.data.results))
			.catch((error) => console.log(error));

		setTimeout(() => setInitialPokemonLoading(true), 500);
	}, [setInitialPokemonLoading]);

	useEffect(() => {
		const maxPokemons = pokemonsByNames.length;
		if (isVisible && maxPokemons !== 0) {
			const newLimit = limit + INCREASE_LIMIT;
			newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
		}
	}, [isVisible]);

	// Reseteamos cuando hacemos una busqueda para volver a empezar con limite inicial
	useEffect(() => {
		setLimit(INITIAL_LIMIT);
	}, [pokemonName]);


	useEffect(() => {
		if (theme === "dark") {
			document.querySelector("html").classList.add('dark')
		}
		else {
			document.querySelector("html").classList.remove('dark')
		}
	}, [theme]);



	return (
		<section className="p-4 py-5">
			<form>
				<div className="p-4 flex rounded-2xl text-lg">
					<input
						className="w-full outline-none flex-1 rounded-2xl p-3 dark:bg-[#18181B] dark:text-white "
						type="text"
						placeholder="Search your pokemon"
						name="pokemonName"
						autoComplete="off"
						onChange={(e) => handleChangePokemonName(e)}
					/>
					<button
						type="button"
						className="bg-red-500 p-3 rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors ml-2"
					>
						<IconSearch color="white" stroke={3} />
					</button>

					<button
						type="button"
						className="bg-blue-500 p-3 rounded-xl shadow-lg shadow-blue-500/50 hover:bg-blue-400 transition-colors ml-2"
						onClick={(e) => toggleDarkMode(e)}>
						<IconMoon color="white" stroke={2} className=""/>	
					</button>
				</div>
			</form>
			<PokemonList pokemons={pokemonsByNames.slice(0, limit)} />
			{/* target observer */}
			<span ref={targetObserver}></span>
		</section>
	);
};

export default Pokemons;

// forma no controlada
// const handleSubmit = (e) => {
// 	e.preventDefault();
// 	setPokemonName(e.target.pokemonName.value.toLowerCase());
// };
