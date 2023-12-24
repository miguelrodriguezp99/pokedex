import Aside from "./components/Aside";
import ModalPokemon from "./components/ModalPokemon";
import Pokemons from "./components/Pokemons";
import usePokemonContext from "./hooks/usePokemonContext";


function App() {
	const {
		showDetailPokemon,
		hideDetailPokemon,
		pokemonDetail,
		isLoading,
		initialPokemonLoading,
	} = usePokemonContext();

	return (
		<>
			{/*  */}
			<div
				id="loading-div"
				className={`${initialPokemonLoading ? "hideLoading" : ""} bg-white dark:bg-[#000000]`}
			>
				<img
					className={`contrast-50 animate-spin-slow h-[60px] filter-brightness-80 ${
						initialPokemonLoading ? "hideLoading" : ""
					}`}
					src="/pokeball-icon.png"
					alt=""
				/>
			</div>
			<section className="bg-[#F6F8FC] h-screen font-outfit overflow-y-auto bg-[url(/pokeball-icon.png)] bg-no-repeat bg-[-10%_-20%] overflow-x-hidden dark:bg-[#000000]">
				<main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] ">
					<Pokemons />
					<Aside pokemon={pokemonDetail} isLoading={isLoading} />
					<ModalPokemon
						showModal={showDetailPokemon}
						closeModal={hideDetailPokemon}
						pokemon={pokemonDetail}
					/>
				</main>
			</section>
		</>
	);
}

export default App;
