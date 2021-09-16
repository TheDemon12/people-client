import React from 'react';
import NextImage, { ImageProps } from 'next/image';

import styles from './styles.module.scss';

interface Props extends ImageProps {
	imgClassName?: string;
}

const Image = ({ className, imgClassName, ...rest }: Props) => {
	return (
		<div
			className={
				className ? `${className} ${styles.imageWrapper}` : styles.imageWrapper
			}>
			<NextImage className={imgClassName} layout='fill' {...rest} />
		</div>
	);
};

export default Image;
