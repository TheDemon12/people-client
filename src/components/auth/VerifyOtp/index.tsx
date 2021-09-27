import Logo from 'components/Logo';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import BarLoader from 'react-spinners/ClipLoader';

import Button from 'components/common/Button';

import styles from './styles.module.scss';
import ErrorMessage from 'components/common/Messages/ErrorMessage';
import axios from 'axios';

interface Props {
	isMobile: boolean;
}

const VerifyOtp: FC<Props> = ({ isMobile }) => {
	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState('');

	const handleSubmit = async () => {
		if (otp.length !== 4) return setResponseError('Enter valid OTP!');

		try {
			setResponseError('');
			setLoading(true);

			const { data } = await axios.post(
				'http://localhost:5000/verify-otp',
				{ otp },
				{
					withCredentials: true,
				}
			);
			console.log(data);

			setLoading(false);
		} catch (ex: any) {
			setLoading(false);
			setResponseError(ex.response?.data || 'Something went wrong!');
		}
	};

	const handleChange = (inputOtp: string) => {
		setOtp(inputOtp);
	};

	return (
		<div className={styles.verifyOtpContainer}>
			{isMobile && <Logo className={styles.logo} />}
			<div className={styles.heading}>
				<h1>Check your email</h1>
				<p>
					We sent a 4-digit code to <span>randomname123@gmail.com</span>
				</p>
				<p>Please enter it below. Can't find it? Check your spam folder.</p>
			</div>
			<div
				className={styles.inputContainer}
				onKeyDown={e => {
					if (e.key === 'Enter') return handleSubmit();
				}}>
				<OtpInput
					value={otp}
					onChange={handleChange}
					numInputs={4}
					containerStyle={styles.otpContainer}
					inputStyle={styles.otpInput}
					errorStyle={styles.error}
					hasErrored={!!responseError}
					isDisabled={loading}
					isInputNum
				/>
			</div>

			<div className={styles.bottomContainer}>
				<ErrorMessage
					className={styles.responseError}
					activeClassName={styles.active}
					errorMessage={responseError}
					active={!!responseError}
				/>
				<p className={styles.noAccount}>
					Didn't receive OTP?
					<Link href=''>
						<a>Resend OTP</a>
					</Link>
				</p>
				<Button type='submit' onClick={handleSubmit}>
					{!loading && `Verify Account`}

					{loading && (
						<BarLoader color={'#fff'} size={24} loading speedMultiplier={0.8} />
					)}
				</Button>
			</div>
		</div>
	);
};

export default VerifyOtp;
