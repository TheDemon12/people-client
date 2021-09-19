import { NextComponentType } from 'next';
import { useState } from 'react';
import { useFormikContext } from 'formik';

import Image from 'components/common/Image';
import Input from 'components/common/Inputs/Input';
import ErrorMessage from 'components/common/Messages/ErrorMessage';

import eyeIcon from 'assets/icons/eye.svg';
import noEyeIcon from 'assets/icons/no-eye.svg';

import styles from './styles.module.scss';
interface PasswordInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: NextComponentType<PasswordInputProps> = props => {
	const [showPassword, setShowPassword] = useState(false);

	const { touched, errors } = useFormikContext<{
		[name: string]: string;
	}>();

	const name = 'password';

	return (
		<div className={styles.passwordInputContainer}>
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
				<Image
					className={styles.showPassword}
					src={showPassword ? noEyeIcon : eyeIcon}
					onClick={() => setShowPassword(!showPassword)}
					alt='show-password'
				/>
			</div>
			<ErrorMessage active={touched[name]} errorMessage={errors[name]} />
		</div>
	);
};

export default PasswordInput;
