import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Formik, FormikValues } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import BarLoader from 'react-spinners/ClipLoader';

import Button from 'components/common/Button';
import ErrorMessage from 'components/common/Messages/ErrorMessage';
import Input from 'components/common/Input';
import PasswordInput from 'components/common/Input/PasswordInput';
import GoogleSignInButton from 'components/auth/GoogleSignInButton';
import Logo from 'components/Logo';

import styles from './styles.module.scss';

const validationSchema = Yup.object({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().label('Password'),
});

interface Props {
	isMobile: boolean;
}

const LoginComponent: FC<Props> = ({ isMobile }) => {
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
			setResponseError(ex.response?.data || 'Something went wrong!');
			setLoading(false);
		}
	};

	const handleGoogleSignIn = () => {
		window.open('http://localhost:5000/register/google', '_self');
	};

	return (
		<div className={styles.loginContainer}>
			{isMobile && <Logo className={styles.logo} />}
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
								autoComplete='off'
							/>
							<PasswordInput />
							<div className={styles.forgotPassword}>
								<Link href='/forgot-password'>
									<a>Forgot Password?</a>
								</Link>
							</div>
						</div>
						<ErrorMessage
							className={styles.responseError}
							activeClassName={styles.active}
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
							<GoogleSignInButton onClick={handleGoogleSignIn} />
							<p className={styles.noAccount}>
								Don't have an Account?
								<Link href='/signup'>
									<a>Sign Up</a>
								</Link>
							</p>
						</div>
					</>
				)}
			</Formik>
		</div>
	);
};

export default LoginComponent;
