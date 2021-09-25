import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Formik, FormikValues } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import BarLoader from 'react-spinners/ClipLoader';

import Button from 'components/common/Button';
import ErrorMessage from 'components/common/Messages/ErrorMessage';
import Input from 'components/common/Input';
import PasswordInput from 'components/common/Input/PasswordInput';
import GoogleSignInButton from 'components/auth/GoogleSignInButton';
import Logo from 'components/Logo';

import styles from './styles.module.scss';

YupPassword(Yup);

const validationSchema = Yup.object({
	name: Yup.string().required().min(3).max(24).label('Name'),
	email: Yup.string().required().email().label('Email'),
	password: Yup.string()
		.required()
		.minNumbers(1)
		.minUppercase(1)
		.minSymbols(1)
		.min(8)
		.minLowercase(1)
		.label('Password'),
});

interface Props {
	isMobile: boolean;
}

const SignupComponent: FC<Props> = ({ isMobile }) => {
	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState('');

	const handleSignUp = async (values: FormikValues) => {
		try {
			setLoading(true);
			setResponseError('');

			const { data } = await axios.post(
				'http://localhost:5000/register',
				{ name: values.name, email: values.email, password: values.password },
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

	const handleGoogleSignUp = () => {
		window.open('http://localhost:5000/register/google', '_self');
	};

	return (
		<div className={styles.signUpContainer}>
			{isMobile && <Logo className={styles.logo} />}
			<div className={styles.heading}>
				<h1>Create new account</h1>
				<p>Please fill in the form to continue</p>
			</div>
			<Formik
				initialValues={{ name: '', email: '', password: '' }}
				onSubmit={handleSignUp}
				validationSchema={validationSchema}>
				{({ handleSubmit }) => (
					<>
						<div className={styles.inputContainer}>
							<Input
								name='name'
								placeholder='Name'
								required
								type='text'
								autoComplete='off'
							/>
							<Input
								name='email'
								placeholder='Email Address'
								required
								type='email'
								autoComplete='off'
							/>
							<PasswordInput />
						</div>
						<ErrorMessage
							className={styles.responseError}
							activeClassName={styles.active}
							errorMessage={responseError}
							active={!!responseError}
						/>
						<div className={styles.bottomContainer}>
							<Button type='submit' onClick={() => handleSubmit()}>
								{!loading && `Sign Up`}

								{loading && (
									<BarLoader
										color={'#fff'}
										size={24}
										loading
										speedMultiplier={0.8}
									/>
								)}
							</Button>
							<GoogleSignInButton onClick={handleGoogleSignUp} />
							<p className={styles.noAccount}>
								Have an Account?
								<Link href='/login'>
									<a>Sign In</a>
								</Link>
							</p>
						</div>
					</>
				)}
			</Formik>
		</div>
	);
};

export default SignupComponent;
