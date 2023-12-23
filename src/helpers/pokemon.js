import { getEvolutionsData } from "../services/pokemonServices";

const formatStats = (stats) => {
	const nameTypes = {
		hp: "HP",
		attack: "ATK",
		defense: "DEF",
		"special-attack": "SpA",
		"special-defense": "SpD",
		speed: "SPD",
	};

	const newStats = stats.map(({ stat, base_stat }) => ({
		name: nameTypes[stat.name],
		base_stat,
	}));

	newStats.push({
		name: "TOT",
		base_stat: newStats.reduce((acc, stat) => acc + stat.base_stat, 0),
	});

	return newStats;
};

const getImageByPokemon = (sprites) => {
	return (
		sprites.versions["generation-v"]["black-white"].animated.front_default ??
		sprites.versions["generation-v"]["black-white"].front_default
	);
};

const formatTypes = (types) => types.map(({ type }) => type.name);

const formatAbilities = (abilities) =>
	abilities.map(({ ability }) => ability.name);

const getPokemonDescription = (pokemonSpecie) =>
	pokemonSpecie.flavor_text_entries[1].flavor_text;

const getEvolutions = async (evolutionInfo) => {
	const evolutions = [];
	let evolutionData = evolutionInfo.chain;

	do {
		const evoDetails = evolutionData["evolution_details"][0];

		evolutions.push({
			name: evolutionData.species.name,
			min_level: evoDetails?.min_level ?? 1,
		});

		evolutionData = evolutionData.evolves_to[0];
	} while (evolutionData);

	const evolutionPromises = getEvolutionsData(evolutions);

	try {
		//Resolvemos todas las promesas a la vez (no tenemos que ir de una en una)
		const responses = await Promise.allSettled(evolutionPromises);
		assignInfoToEvolutions(responses, evolutions);
	} catch (err) {
		console.log(err);
	}

	return evolutions;
};

const assignInfoToEvolutions = (responses, evolutions) => {
	responses.forEach((response, index) => {
		if (response.status === "fulfilled") {
			evolutions[index].image =
				response.value.data.sprites.versions["generation-v"][
					"black-white"
				].front_default;

			evolutions[index].pokemonInfo = response.value.data;
		}
	});
};

export {
	assignInfoToEvolutions,
	formatAbilities,
	formatStats,
	formatTypes,
	getEvolutions,
	getImageByPokemon,
	getPokemonDescription,
};
