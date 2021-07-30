import { useState } from 'react';

type ProductTuple<T> = [
	T,
	(arg0: React.SyntheticEvent) => void,
	() => void
]

const useForm = <T>(format: T): ProductTuple<T> => {
	const [form, setForm] = useState<T>(format);

	const mutateForm = ({ target }: React.SyntheticEvent): void => {
		const { name, value, type, checked } = target as HTMLInputElement;
		setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
	};

	const resetForm = (): void => {
		setForm(format);
	};

	return [form, mutateForm, resetForm];
};

export default useForm;
