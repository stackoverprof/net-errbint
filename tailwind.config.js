const safelist = [
	'text-accent-orange',
	'text-accent-purple',
	'text-accent-green',
	'text-accent-blue',
	'bg-accent-orange',
	'bg-accent-purple',
	'bg-accent-green',
	'bg-accent-blue'
];

module.exports = {
	mode: 'jit',
	purge: {
		content: ['./pages/**/*.{js,ts,jsx,tsx}',
			'./components/**/*.{js,ts,jsx,tsx}'],
		safelist: safelist
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				base: '#F5F5F5',
				primary: '#000000',
				white: '#F5F5F5',
				accent: {
					DEFAULT: '#FF5B14',
					orange: '#FF5B14',
					purple: '#7810ff',
					green: '#45cf22',
					blue: '#0d78db'
				},
				info: '#2DA7FB',
				warning: '#FFCB11',
				danger: '#ec4141',
				success: '#67db8e',
			},
			fontFamily: {
				main: 'Bahnschrift, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
				bahn: 'Bahnschrift, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
				popp: 'Poppkorn, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
			},
			screens: {
				'-2xl': { raw: '(max-width: 1535px)' },
				'-xl': { raw: '(max-width: 1279px)' },
				'-lg': { raw: '(max-width: 1023px)' },
				'-md': { raw: '(max-width: 767px)' },
				'-sm': { raw: '(max-width: 639px)' },
			},
		},
	},
	variants: {
		extend: { },
	},
	plugins: [],
};
