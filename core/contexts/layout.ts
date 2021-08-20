import { useState } from 'react';
import { AlertType, LayoutStoreType, EnumTheme } from './layout.types';

const LayoutStore = (): LayoutStoreType => {
	const [alert_value, Alert] = useState<AlertType | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<EnumTheme>('orange');

	const resetAlert = () => Alert(null);

	return {
		alert_value,
		Alert,
		resetAlert,
		selectedTheme,
		setSelectedTheme,
	};
};

export default LayoutStore;