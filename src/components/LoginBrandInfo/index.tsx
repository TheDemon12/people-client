import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { autoplayPlugin, Dots } from '@brainhubeu/react-carousel';
const Carousel = dynamic(() => import('@brainhubeu/react-carousel'), {
	ssr: false,
});

import Image from 'components/common/Image';

import logoIcon from 'assets/icons/logo.svg';

import styles from './styles.module.scss';
import '@brainhubeu/react-carousel/lib/style.css';

const LoginBrandInfo = () => {
	const [value, setValue] = useState(0);
	const texts = [
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur ipsum quis gravida laoreet. Vivamus aliquet dui eu mollis dictum. Curabitur est magna, volutpat scelerisque consectetur sed, faucibus eget tellus. Donec ut nisl eu justo aliquam interdum. Vestibulum ornare posuere odio vel faucibus. Sed mi tellus, lobortis sed viverra sed, pharetra sed orci. Donec ultricies enim non quam pretium porta.',
		'Sed ac elementum nisi. Nullam convallis nibh turpis, id iaculis enim bibendum id. Aliquam a dignissim ex. Nulla quis accumsan enim, sed efficitur odio. Praesent tellus arcu, maximus ut malesuada et, sollicitudin euismod metus. Mauris semper id magna in sodales. Donec gravida viverra ligula, quis euismod erat fermentum tempus. Donec lacus nunc, lobortis non purus non, elementum hendrerit nisl. Vestibulum .',
		'Integer aliquam neque odio, vitae semper erat ornare non. Donec ut dictum metus. Nullam condimentum sed tortor sed imperdiet. Quisque rutrum, eros id condimentum tincidunt, turpis turpis suscipit sapien, a elementum tortor tellus id quam. Nunc mollis hendrerit lorem, eu lobortis nisl gravida molestie. Sed rhoncus ac odio in eleifend. Fusce ac mattis nunc. Sed varius fringilla nisi, quis mollis erat.',
	];

	return (
		<div className={styles.infoContainer}>
			<div className={styles.carouselContainer}>
				<Link href='/' passHref>
					<a className={styles.logoWrapper}>
						<Image
							src={logoIcon}
							alt='people-logo'
							className={styles.logo}
							lazy={false}
						/>
					</a>
				</Link>
				<Carousel
					value={value}
					onChange={val => setValue(val)}
					plugins={[
						'infinite',
						{
							resolve: autoplayPlugin,
							options: {
								interval: 6000,
								stopAutoPlayOnHover: true,
							},
						},
					]}
					draggable={false}>
					<p>{texts[0]}</p>
					<p>{texts[1]}</p>
					<p>{texts[2]}</p>
				</Carousel>
				<Dots
					value={value}
					number={3}
					onChange={val => setValue(val)}
					className={styles.dot}
				/>
			</div>
		</div>
	);
};

export default LoginBrandInfo;
