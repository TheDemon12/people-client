import { FC, HTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
	className?: string;
	active?: boolean;
	errorMessage?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
	active,
	errorMessage,
	className,
	...rest
}) => {
	return (
		<p
			className={`${styles.errorMessage} ${className} ${
				active ? styles.active : ''
			}`}
			{...rest}>
			{active && errorMessage}
		</p>
	);
};

export default ErrorMessage;
