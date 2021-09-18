import React, { useState } from 'react';
import Link from 'next/link';
import { Formik, FormikValues } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import BarLoader from 'react-spinners/ClipLoader';

import Button from 'components/common/Button';
import ErrorMessage from 'components/common/Messages/ErrorMessage';
import Image from 'components/common/Image';
import Input from 'components/common/Inputs/Input';
import PasswordInput from 'components/common/Inputs/PasswordInput';

import googleIcon from 'assets/icons/google.svg';

import styles from './styles.module.scss';

YupPassword(Yup);

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

const LoginComponent = () => {
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

	const handleGoogleSignIn = () => {
		window.open('http://localhost:5000/register/google', '_self');
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.innerContainer}>
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
								<PasswordInput />
								<div className={styles.forgotPassword}>
									<Link href='/forgot-password'>Forgot Password?</Link>
								</div>
							</div>
							<ErrorMessage
								className={styles.responseError}
								errorMessage={responseError}
								active={!!responseError}
							/>
							<div className={styles.bottomContainer}>
								<Button type='submit' onClick={() => handleSubmit()}>
									{!loading && `Sign In`}

									{loading && (
										<BarLoader
											color={'#fff'}
											size={24}
											loading
											speedMultiplier={0.8}
										/>
									)}
								</Button>
								<Button className={styles.google} onClick={handleGoogleSignIn}>
									<Image
										className={styles.logo}
										src={googleIcon}
										alt='google-icon'
									/>
									Sign In with Google
								</Button>
								<p className={styles.noAccount}>
									Don't have an Account? <Link href='/signup'>Sign Up</Link>
								</p>
							</div>
						</>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default LoginComponent;
