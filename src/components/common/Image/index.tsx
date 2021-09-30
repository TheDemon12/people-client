import React from 'react';
import NextImage, { ImageProps } from 'next/image';

import styles from './styles.module.scss';

interface Props extends ImageProps {
	imgClassName?: string;
	lazy?: boolean;
}

const Image = ({ className, imgClassName, lazy = true, ...rest }: Props) => {
	return (
		<div
			className={
				className ? `${className} ${styles.imageWrapper}` : styles.imageWrapper
			}>
			<NextImage
				className={imgClassName}
				layout='fill'
				{...rest}
				priority={!lazy}
			/>
		</div>
	);
};

export default Image;
