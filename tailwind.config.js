/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				outfit: ["Outfit", "sans-serif"],
			},
			animation: {
				"spin-slow": "spin 2s linear infinite",
			},
		},
	},
	plugins: [],
};
