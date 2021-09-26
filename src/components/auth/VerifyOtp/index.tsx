import Logo from 'components/Logo';
import React, { ChangeEvent, FC, useState } from 'react';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import BarLoader from 'react-spinners/ClipLoader';

import Button from 'components/common/Button';

import styles from './styles.module.scss';

interface Props {
	isMobile: boolean;
}

const VerifyOtp: FC<Props> = ({ isMobile }) => {
	const [otp, setOtp] = useState('');
	const [focus, setFocus] = useState(true);
	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState('');

	const onOTPChange = (val: string) => {
		setOtp(val);
		if (otp.length === 4) setFocus(false);
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
			<div className={styles.inputContainer}>
				<OtpInput
					value={otp}
					onChange={onOTPChange}
					numInputs={4}
					containerStyle={styles.otpContainer}
					inputStyle={styles.otpInput}
					errorStyle={styles.error}
					hasErrored={!!responseError}
					isInputNum
					shouldAutoFocus={!focus}
				/>
			</div>
			<div className={styles.bottomContainer}>
				<p className={styles.noAccount}>
					Didn't receive OTP?
					<Link href=''>
						<a>Resend OTP</a>
					</Link>
				</p>
				<Button
					type='submit'
					onClick={() => {
						console.log('heh');
						setResponseError('error');
					}}>
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
