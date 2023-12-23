import axios from "axios";

const getEvolutionsData = (evolutions) => {
	return evolutions.map(
		async (evolution) =>
			await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.name}`),
	);
};

export { getEvolutionsData };
