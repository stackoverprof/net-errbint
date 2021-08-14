import { useState } from 'react';
import { EnumType } from '@components/_shared/AlertHandler';

const LayoutStore = (): LayoutStoreType => {
	const [mainAlert, setMainAlert] = useState<AlertType | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<ThemeType>('purple');

	const resetMainAlert = () => setMainAlert(null);

	return {
		mainAlert,
		selectedTheme,
		setSelectedTheme,
		setMainAlert,
		resetMainAlert,
	};
};

export interface LayoutStoreType {
	mainAlert: AlertType | null
	selectedTheme: ThemeType
	setSelectedTheme(arg0: ThemeType): void
	setMainAlert(arg0: AlertType | null): void
	resetMainAlert(): void
}

export interface AlertType {
	type?: EnumType,
	message: string
}

export type ThemeType = 'orange' | 'purple' | 'green' | 'blue'

export default LayoutStore;