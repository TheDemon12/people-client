import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import BarLoader from 'react-spinners/ClipLoader';
import { FormikValues, Formik } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

import PasswordInput from 'components/common/Inputs/PasswordInput';
import Input from 'components/common/Inputs/Input';
import ErrorMessage from 'components/common/Messages/ErrorMessage';

import styles from './styles.module.scss';

import googleIcon from 'assets/icons/google.svg';
import loginBg from 'assets/images/login-bg.svg';
import logo from 'assets/icons/logo.svg';
import dot from 'assets/icons/dot.svg';
import elongatedDot from 'assets/icons/elongated-dot.svg';

YupPassword(Yup);

const Login: FC = () => {
	const [currValue, setCurrValue] = useState(0);
	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState('');

	const handleSignIn = async (values: FormikValues) => {
		try {
			setLoading(true);
			setResponseError('');

			const { data } = await axios.post(
				'http://localhost:5000/login',
				{ email: values.email, password: values.password },
				{
					withCredentials: true,
				}
			);
			console.log(data);

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

	const validationSchema = Yup.object({
		email: Yup.string().required().email().label('Email'),
		password: Yup.string()
			.required()
			// .minNumbers(1)
			// .minUppercase(1)
			// .minSymbols(1)
			// .min(8)
			// .minLowercase(1)
			.label('Password'),
	});

	return (
		<div className={styles.login}>
			<div className={styles.loginContainer}>
				<div className={styles.heading}>
					<h1>Welcome Back!</h1>
					<p>Please sign in to your account</p>
				</div>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={handleSignIn}
					validationSchema={validationSchema}>
					{({ handleSubmit }) => (
						<>
							<div className={styles.inputContainer}>
								<Input
									name='email'
									placeholder='Email Address'
									required
									type='email'
								/>
								<PasswordInput required />
								<p className={styles.forgotPassword}>Forgot Password?</p>
							</div>
							<ErrorMessage
								className={styles.responseError}
								errorMessage={responseError}
								active={!!responseError}
							/>
							<div className={styles.bottomContainer}>
								<button type='submit' onClick={() => handleSubmit()}>
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
						</>
					)}
				</Formik>
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
};

export default Login;
