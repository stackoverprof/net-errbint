import { useState } from 'react';
import { AlertType, LayoutStoreType, EnumTheme } from './layout.types';

const LayoutStore = (): LayoutStoreType => {
	const [mainAlert, setMainAlert] = useState<AlertType | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<EnumTheme>('orange');

	const resetMainAlert = () => setMainAlert(null);

	return {
		mainAlert,
		selectedTheme,
		setSelectedTheme,
		setMainAlert,
		resetMainAlert,
	};
};

export default LayoutStore;