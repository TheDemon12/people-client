import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import Logo from 'components/Logo';

import styles from './styles.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const LoginBrandInfo = () => {
	const texts = [
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur ipsum quis gravida laoreet. Vivamus aliquet dui eu mollis dictum. Curabitur est magna, volutpat scelerisque consectetur sed, faucibus eget tellus. Donec ut nisl eu justo aliquam interdum. Vestibulum ornare posuere odio vel faucibus. Sed mi tellus, lobortis sed viverra sed, pharetra sed orci. Donec ultricies enim non quam pretium porta.',
		'Sed ac elementum nisi. Nullam convallis nibh turpis, id iaculis enim bibendum id. Aliquam a dignissim ex. Nulla quis accumsan enim, sed efficitur odio. Praesent tellus arcu, maximus ut malesuada et, sollicitudin euismod metus. Mauris semper id magna in sodales. Donec gravida viverra ligula, quis euismod erat fermentum tempus. Donec lacus nunc, lobortis non purus non, elementum hendrerit nisl. Vestibulum .',
		'Integer aliquam neque odio, vitae semper erat ornare non. Donec ut dictum metus. Nullam condimentum sed tortor sed imperdiet. Quisque rutrum, eros id condimentum tincidunt, turpis turpis suscipit sapien, a elementum tortor tellus id quam. Nunc mollis hendrerit lorem, eu lobortis nisl gravida molestie. Sed rhoncus ac odio in eleifend. Fusce ac mattis nunc. Sed varius fringilla nisi, quis mollis erat.',
	];

	return (
		<div className={styles.infoContainer}>
			<div className={styles.carouselContainer}>
				<Logo className={styles.logo} />
				<Carousel
					showThumbs={false}
					className={styles.carousel}
					infiniteLoop
					showStatus={false}
					showArrows={false}
					autoPlay
					emulateTouch
					swipeable
					interval={5000}
					renderIndicator={(
						clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
						isSelected: boolean
					) => (
						<div
							className={`${styles.dot} ${isSelected ? styles.selected : ''}`}
							onClick={clickHandler}></div>
					)}>
					{texts.map(t => (
						<div key={t}>
							<p>{t}</p>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default LoginBrandInfo;
