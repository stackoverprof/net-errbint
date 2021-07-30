import { useState } from 'react';
import { EnumType } from '@components/_shared/AlertHandler';

const LayoutStore = (): LayoutStoreType => {
	const [mainAlert, setMainAlert] = useState<AlertType | null>(null);

	const resetMainAlert = () => setMainAlert(null);

	return {
		mainAlert,
		setMainAlert,
		resetMainAlert,
	};
};

export interface LayoutStoreType {
	mainAlert: AlertType | null
	setMainAlert(arg0: AlertType | null): void
	resetMainAlert(): void
}

export interface AlertType {
	type?: EnumType,
	message: string
}

export default LayoutStore;