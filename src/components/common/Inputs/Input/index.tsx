import ErrorMessage from 'components/common/Messages/ErrorMessage';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import styles from './styles.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	hideErrorBorder?: boolean;
	hideInputError?: boolean;
}

const Input: FC<InputProps> = ({
	name,
	hideErrorBorder,
	hideInputError,
	...rest
}) => {
	const { setFieldTouched, handleChange, touched, errors } = useFormikContext<{
		[name: string]: string;
	}>();
	return (
		<>
			<input
				{...rest}
				onChange={handleChange(name)}
				className={`${
					!hideErrorBorder && touched[name] && errors[name] ? styles.error : ''
				} ${styles.inputField}`}
				onBlur={() => setFieldTouched(name)}
			/>
			{!hideInputError && (
				<ErrorMessage active={touched[name]} errorMessage={errors[name]} />
			)}
		</>
	);
};

export default Input;
