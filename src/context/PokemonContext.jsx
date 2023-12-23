import axios from "axios";
import { createContext, useState } from "react";
import {
	formatAbilities,
	formatStats,
	formatTypes,
	getEvolutions,
	getImageByPokemon,
	getPokemonDescription,
} from "../helpers/pokemon";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
	const [pokemonDetail, setPokemonDetail] = useState(null);
	const [showDetailPokemon, setShowDetailPokemon] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [initialPokemonLoading, setInitialPokemonLoading] = useState(true);

	const showPokemon = async (pokemonInfo) => {
		setIsLoading(true);
		const { data: dataSpecies } = await axios.get(pokemonInfo.species.url);
		const { data: dataEvolution } = await axios.get(
			dataSpecies.evolution_chain.url,
		);
		const { id, name, height, weight, stats, types, abilities } = pokemonInfo;
		const evolutions = await getEvolutions(dataEvolution);

		setPokemonDetail({
			id,
			name,
			height,
			weight,
			stats: formatStats(stats),
			types: formatTypes(types),
			abilities: formatAbilities(abilities),
			description: getPokemonDescription(dataSpecies),
			evolutions,
			image: getImageByPokemon(pokemonInfo.sprites),
		});

		setShowDetailPokemon(true);
		setTimeout(() => setIsLoading(false), 500);
	};

	const hideDetailPokemon = () => {
		setShowDetailPokemon(false);
	};

	return (
		<PokemonContext.Provider
			value={{
				showDetailPokemon,
				showPokemon,
				hideDetailPokemon,
				pokemonDetail,
				isLoading,
				initialPokemonLoading,
				setInitialPokemonLoading,
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
};

export { PokemonContext, PokemonProvider };
