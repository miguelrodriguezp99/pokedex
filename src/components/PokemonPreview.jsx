import axios from "axios";
import { useEffect, useState } from "react";
import { colorByType } from "../constants/pokemon";

const PokemonPreview = ({ pokemonURL, onClick }) => {
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		axios
			.get(pokemonURL)
			.then(({ data }) => setPokemon(data))
			.catch((error) => console.log(error));
	}, [pokemonURL]);

	return (
		<article
			onClick={() => onClick(pokemon)}
			className="text-center bg-white rounded-[30px] relative font-semibold capitalize pb-4 shadow-lg
         shadow-slate-400/10 border-2 border-transparent hover:border-slate-200 cursor-pointer group grid gap-2"
		>
			<header className="h-9">
				<img
					className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2
                    group-hover:scale-110 transition-transform pixelated"
					src={pokemon.sprites?.front_default}
					alt={pokemon.name}
				/>
			</header>
			<span className="text-sm text-slate-400">Nº {pokemon?.id}</span>
			<h4 className="text-lg">{pokemon?.name}</h4>
			<ul className="flex gap-2 justify-center">
				{pokemon?.types?.map((type) => (
					<li
						className={`p-1 rounded-md px-2 text-white ${
							colorByType[type.type.name]
						} text-sm`}
						key={type.type.name}
					>
						{type.type.name}
					</li>
				))}
			</ul>
		</article>
	);
};

export default PokemonPreview;
