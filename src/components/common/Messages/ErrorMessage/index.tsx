import { FC, HTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	activeClassName?: string;
	active?: boolean;
	errorMessage?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
	active,
	errorMessage,
	className,
	activeClassName,
	...rest
}) => {
	return (
		<div
			className={`${styles.errorMessage} ${
				active ? ` ${styles.active} ${activeClassName}` : ''
			} ${className} `}
			{...rest}>
			{active && errorMessage}
		</div>
	);
};

export default ErrorMessage;
