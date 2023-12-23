import usePokemonContext from "../hooks/usePokemonContext";

const Evolutions = ({ evolutions }) => {
	const { showPokemon } = usePokemonContext();

	console.log(evolutions);
	return (
		<div className="flex justify-center items-center gap-2 flex-wrap">
			{evolutions.map((evolution, index) => (
				<article key={evolution.name} className="flex gap -2 items-center">
					{index !== 0 && (
						<div className="bg-slate-100 p-2 rounded-full text-sm font-bold">
							<span> Lv. {evolution.min_level}</span>
						</div>
					)}
					<button
						className="hover:bg-slate-100 cursor-pointer rounded-3xl transition-colors"
						onClick={() => showPokemon(evolution.pokemonInfo)}
					>
						<img src={evolution.image} alt="{evolution.name}" />
					</button>
				</article>
			))}
		</div>
	);
};

export default Evolutions;
