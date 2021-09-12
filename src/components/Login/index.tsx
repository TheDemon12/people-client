import { useEffect, useState } from 'react';
import axios from 'axios';
import BarLoader from 'react-spinners/ClipLoader';
import { Formik } from 'formik';
import * as yup from 'yup';

import * as styles from './index.module.scss';

import googleIcon from '../../assets/icons/google.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import noEyeIcon from '../../assets/icons/no-eye.svg';
import loginBg from '../../assets/images/login-bg.svg';
import logo from '../../assets/icons/logo.svg';
import dot from '../../assets/icons/dot.svg';
import elongatedDot from '../../assets/icons/elongated-dot.svg';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [currValue, setCurrValue] = useState(0);
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [inputErrors, setInputErrors] = useState({
		email: '',
		password: '',
	});
	const [responseError, setResponseError] = useState('');

	const validEmailRegex = RegExp(
		/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	);

	const handleSignIn = async () => {
		try {
			setLoading(true);

			if (!inputEmail)
				setInputErrors({
					password: '',
					email: 'Email is empty!',
				});
			else if (!validEmailRegex.test(inputEmail))
				setInputErrors({
					password: '',
					email: 'Email is not valid!',
				});
			else if (!inputPassword)
				setInputErrors({
					password: 'Password is empty!',
					email: '',
				});
			// else if (inputPassword.length < 8)
			// 	setInputErrors({
			// 		email: '',
			// 		password: 'Password must be 8 characters long!',
			// 	});
			else {
				setInputErrors({
					password: '',
					email: '',
				});
				setResponseError('');
				const { data } = await axios.post(
					'http://192.168.0.109:5000/login',
					{ email: inputEmail, password: inputPassword },
					{
						withCredentials: true,
					}
				);
				console.log(data);
			}

			setLoading(false);
		} catch (ex: any) {
			setResponseError(ex.response?.data);
			setLoading(false);
		}
	};

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
		<div className={styles.login}>
			<div className={styles.loginContainer}>
				<div className={styles.heading}>
					<h1>Welcome Back!</h1>
					<p>Please sign in to your account</p>
				</div>
				<div className={styles.inputContainer}>
					<input
						type='email'
						placeholder='Email Address'
						value={inputEmail}
						onChange={e => setInputEmail(e.target.value)}
						className={inputErrors.email ? styles.error : ''}
					/>
					<div
						className={`${styles.passwordInput} ${
							inputErrors.password ? styles.error : ''
						}`}>
						<input
							required
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							className={styles.password}
							value={inputPassword}
							onChange={e => setInputPassword(e.target.value)}
							onClick={e => e.currentTarget.focus()}
							onFocus={e =>
								e.currentTarget.setSelectionRange(
									e.currentTarget.value.length,
									e.currentTarget.value.length
								)
							}
						/>
						<img
							onClick={() => setShowPassword(!showPassword)}
							src={showPassword ? noEyeIcon : eyeIcon}
						/>
					</div>

					<p className={styles.forgotPassword}>Forgot Password?</p>
					<p className={styles.errors}>
						{inputErrors.email || inputErrors.password || responseError}
					</p>
				</div>
				<div className={styles.bottomContainer}>
					<button onClick={handleSignIn}>
						{!loading && `Sign In`}

						{loading && (
							<BarLoader
								color={'#fff'}
								size={24}
								loading
								speedMultiplier={0.8}
							/>
						)}
					</button>
					<button className={styles.google}>
						<img src={googleIcon} />
						Sign In with Google
					</button>
					<p className={styles.noAccount}>
						Don't have an Account? <span>Sign Up</span>
					</p>
				</div>
			</div>
			<div className={styles.infoContainer}>
				<img className={styles.bg} src={loginBg} alt='' />
				<div className={styles.contentWrapper}>
					<img className={styles.logo} src={logo} alt='' />
					<p>{texts[currValue]}</p>
					<div className={styles.navigationDots}>
						{texts.map((e, index) => (
							<img
								src={index === currValue ? elongatedDot : dot}
								onClick={() => setCurrValue(index)}></img>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
