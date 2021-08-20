import { EnumType } from '@components/_shared/AlertHandler';

export interface LayoutStoreType {
	alert_value: AlertType | null
	Alert(arg0: AlertType | null): void
	resetAlert(): void
	selectedTheme: EnumTheme
	setSelectedTheme(arg0: EnumTheme): void
}

export interface AlertType {
	type?: EnumType,
	message: string
}

export type EnumTheme = 'orange' | 'purple' | 'green' | 'blue'
