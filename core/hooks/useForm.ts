import { useState } from 'react';

interface ProductTuple<T> {
	form: T
	mutateForm(arg0: React.SyntheticEvent): void,
	setForm(arg0: string, arg1: any): void,
	resetForm(): void
}

const useForm = <T>(format: T): ProductTuple<T> => {
	const [state, setState] = useState<T>(format);

	const form = state;

	const mutateForm = ({ target }: React.SyntheticEvent): void => {
		const { name, value, type, checked } = target as HTMLInputElement;
		const getData = () => ({
			checkbox: checked,
			radio: checked,
		}[type] || value);
		setState((prev) => ({ ...prev, [name]: getData() }));
	};

	const setForm = (field: string, value: any) => {
		setState((prev) => ({ ...prev, [field]: value }));
	};

	const resetForm = (): void => {
		setState(format);
	};

	return { form, mutateForm, setForm, resetForm };
};

export default useForm;
