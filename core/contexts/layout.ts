import { useEffect, useState } from 'react';
import { AlertType, LayoutStoreType, EnumTheme } from './layout.types';

const LayoutStore = (): LayoutStoreType => {
	const [selectedTheme, setSelectedTheme] = useState<EnumTheme>('orange');
	const [alert_value, Alert] = useState<AlertType | null>(null);

	const _setSelectedTheme = (value: EnumTheme) => {
		window.localStorage.setItem('selected_theme', value);
		setSelectedTheme(value);
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment 
		// @ts-ignore 
		const local: EnumTheme = window.localStorage.getItem('selected_theme');
		setSelectedTheme(local);
	}, []);

	const resetAlert = () => Alert(null);

	return {
		alert_value,
		Alert,
		resetAlert,
		selectedTheme,
		setSelectedTheme: _setSelectedTheme,
	};
};

export default LayoutStore;