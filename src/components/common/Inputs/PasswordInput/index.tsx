import { FC, useState } from 'react';

import eyeIcon from 'assets/icons/eye.svg';
import noEyeIcon from 'assets/icons/no-eye.svg';

import styles from './styles.module.scss';
import Input from '../Input';
import { useFormikContext } from 'formik';
import ErrorMessage from 'components/common/Messages/ErrorMessage';

interface PasswordInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: FC<PasswordInputProps> = props => {
	const [showPassword, setShowPassword] = useState(false);

	const { touched, errors } = useFormikContext<{
		[name: string]: string;
	}>();

	const name = 'password';

	return (
		<>
			<div
				className={`${styles.passwordInput} ${
					touched[name] && errors[name] ? styles.error : ''
				}`}>
				<Input
					{...props}
					hideErrorBorder
					hideInputError
					name={name}
					onClick={e => e.currentTarget.focus()}
					onFocus={e =>
						e.currentTarget.setSelectionRange(
							e.currentTarget.value.length,
							e.currentTarget.value.length
						)
					}
					placeholder='Password'
					required
					type={showPassword ? 'text' : 'password'}
				/>

				<img
					src={showPassword ? noEyeIcon : eyeIcon}
					onClick={() => setShowPassword(!showPassword)}
					alt='show-password'
				/>
			</div>
			<ErrorMessage active={touched[name]} errorMessage={errors[name]} />
		</>
	);
};

export default PasswordInput;
