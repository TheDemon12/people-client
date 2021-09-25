import React, { ButtonHTMLAttributes, FC } from 'react';

import Button from 'components/common/Button';
import Image from 'components/common/Image';

import googleIcon from 'assets/icons/google.svg';
import styles from './styles.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const GoogleSignInButton: FC<Props> = ({ onClick, ...rest }) => {
	return (
		<Button className={styles.google} onClick={onClick} {...rest}>
			<Image
				className={styles.googleLogo}
				src={googleIcon}
				alt='google-icon'
				lazy={false}
			/>
			Sign In with Google
		</Button>
	);
};

export default GoogleSignInButton;
