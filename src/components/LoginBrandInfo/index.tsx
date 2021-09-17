import React, { useState, useEffect } from 'react';

import Image from 'components/common/Image';

import logo from 'assets/icons/logo.svg';
import dot from 'assets/icons/dot.svg';
import elongatedDot from 'assets/icons/elongated-dot.svg';

import styles from './styles.module.scss';

const LoginBrandInfo = () => {
	const [currValue, setCurrValue] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (currValue === 2) setCurrValue(0);
			else setCurrValue(currValue + 1);
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	});

	const texts = [
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur ipsum quis gravida laoreet. Vivamus aliquet dui eu mollis dictum. Curabitur est magna, volutpat scelerisque consectetur sed, faucibus eget tellus. Donec ut nisl eu justo aliquam interdum. Vestibulum ornare posuere odio vel faucibus. Sed mi tellus, lobortis sed viverra sed, pharetra sed orci. Donec ultricies enim non quam pretium porta.',
		'Sed ac elementum nisi. Nullam convallis nibh turpis, id iaculis enim bibendum id. Aliquam a dignissim ex. Nulla quis accumsan enim, sed efficitur odio. Praesent tellus arcu, maximus ut malesuada et, sollicitudin euismod metus. Mauris semper id magna in sodales. Donec gravida viverra ligula, quis euismod erat fermentum tempus. Donec lacus nunc, lobortis non purus non, elementum hendrerit nisl. Vestibulum .',
		'Integer aliquam neque odio, vitae semper erat ornare non. Donec ut dictum metus. Nullam condimentum sed tortor sed imperdiet. Quisque rutrum, eros id condimentum tincidunt, turpis turpis suscipit sapien, a elementum tortor tellus id quam. Nunc mollis hendrerit lorem, eu lobortis nisl gravida molestie. Sed rhoncus ac odio in eleifend. Fusce ac mattis nunc. Sed varius fringilla nisi, quis mollis erat.',
	];

	return (
		<div className={styles.infoContainer}>
			<div className={styles.contentWrapper}>
				<Image className={styles.logo} src={logo} alt='' />

				<p>{texts[currValue]}</p>
				<div className={styles.navigationDots}>
					{texts.map((e, index) => (
						<Image
							key={e}
							src={index === currValue ? elongatedDot : dot}
							onClick={() => setCurrValue(index)}
							alt='dot'
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default LoginBrandInfo;
