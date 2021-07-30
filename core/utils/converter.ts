
export const snakeToPascal = (string: string): string => {
	return string.split('/').map(snake => snake.split('_').map(substr => substr.charAt(0).toUpperCase() + substr.slice(1)).join('')).join('/');
};