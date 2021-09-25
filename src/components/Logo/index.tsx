import React, { FC } from 'react';
import Link from 'next/link';

import Image from 'components/common/Image';

import styles from './styles.module.scss';
import logoIcon from 'assets/icons/logo.svg';

interface Props {
	className?: string;
}

const Logo: FC<Props> = ({ className }) => {
	return (
		<Link href='/' passHref>
			<a>
				<Image
					src={logoIcon}
					alt='people-logo'
					className={`${styles.logo} ${className || ''}`}
					lazy={false}
				/>
			</a>
		</Link>
	);
};

export default Logo;
