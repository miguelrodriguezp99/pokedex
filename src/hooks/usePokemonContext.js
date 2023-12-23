import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

const usePokemonContext = () => useContext(PokemonContext);

export default usePokemonContext;
