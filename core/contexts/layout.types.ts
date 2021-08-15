import { EnumType } from '@components/_shared/AlertHandler';

export interface LayoutStoreType {
	mainAlert: AlertType | null
	selectedTheme: EnumTheme
	setSelectedTheme(arg0: EnumTheme): void
	setMainAlert(arg0: AlertType | null): void
	resetMainAlert(): void
}

export interface AlertType {
	type?: EnumType,
	message: string
}

export type EnumTheme = 'orange' | 'purple' | 'green' | 'blue'
