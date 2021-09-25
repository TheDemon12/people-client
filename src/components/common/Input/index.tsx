import ErrorMessage from 'components/common/Messages/ErrorMessage';
import { useFormikContext } from 'formik';
import { FC, useState } from 'react';
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

	const [firstChange, setFirstChange] = useState(false);

	return (
		<div className={styles.inputContainer}>
			<input
				{...rest}
				onChange={event => {
					if (!firstChange) {
						setFirstChange(true);
						setFieldTouched(name);
					}
					handleChange(name)(event);
				}}
				className={`${
					!hideErrorBorder && touched[name] && errors[name] ? styles.error : ''
				} ${styles.inputField}`}
			/>
			{!hideInputError && (
				<ErrorMessage active={touched[name]} errorMessage={errors[name]} />
			)}
		</div>
	);
};

export default Input;
