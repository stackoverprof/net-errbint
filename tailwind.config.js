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
				accent: {
					orange: {
						DEFAULT: '#FF5B14',
						dark: '#FF5B14',
						light: '#FF9914',
						shadow: '#FFC01E',
					},
					purple: {
						DEFAULT: '#7810FF',
						dark: '#7810FF',
						light: '#C42EFF',
						shadow: '#E374FF',
					},
					green: {
						DEFAULT: '#46BF27',
						dark: '#46BF27',
						light: '#A3E20F',
						shadow: '#70FF00',
					},
					blue: {
						DEFAULT: '#0D78DB',
						dark: '#0D78DB',
						light: '#10BBFF',
						shadow: '#6CCAFF',
					},
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
			fontSize: {
				'2.5xl': '1.65rem'
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
		extend: {},
	},
	plugins: [],
};
