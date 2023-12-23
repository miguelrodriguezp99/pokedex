const colorByType = {
	normal: "bg-[#BCBCAC]",
	fighting: "bg-[#BC5442]",
	flying: "bg-[#669AFF]",
	poison: "bg-[#AB549A]",
	ground: "bg-[#DEBC54]",
	rock: "bg-[#BCAC66]",
	bug: "bg-[#ABBC1C]",
	ghost: "bg-[#6666BC]",
	steel: "bg-[#ABACBC]",
	fire: "bg-[#FF421C]",
	water: "bg-[#2F9AFF]",
	grass: "bg-[#78CD54]",
	electric: "bg-[#FFCD30]",
	psychic: "bg-[#FF549A]",
	ice: "bg-[#78DEFF]",
	dragon: "bg-[#7866EF]",
	dark: "bg-[#785442]",
	fairy: "bg-[#FFACFF]",
	unknown: "",
	shadow: "",
};

// [&>div] -> Select the first div inside the parent
const colorByStat = {
	HP: "bg-slate-100 [&>div]:bg-red-500",
	ATK: "bg-slate-100 [&>div]:bg-orange-500",
	DEF: "bg-slate-100 [&>div]:bg-yellow-500",
	SpA: "bg-slate-100 [&>div]:bg-blue-300",
	SpD: "bg-slate-100 [&>div]:bg-green-500",
	SPD: "bg-slate-100 [&>div]:bg-pink-500",
	TOT: "bg-blue-300 [&>div]:bg-blue-500",
};

export { colorByStat, colorByType };
