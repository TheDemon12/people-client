import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
	return (
		<button className={`${styles.button} ${className}`} {...rest}>
			{children}
		</button>
	);
};

export default Button;
