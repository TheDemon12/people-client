import { NextPage, NextPageContext } from 'next';

import VerifyOtpComponent from 'components/auth/VerifyOtp';
import InfoComponent from 'components/auth/LoginBrandInfo';

import { isMobile } from 'utils';

import styles from './styles.module.scss';

interface VerifyOtpPageProps {
	isMobile: boolean;
}

const VerifyOtp: NextPage<VerifyOtpPageProps> = ({ isMobile }) => {
	return (
		<div className={`${styles.verifyOtp} ${isMobile ? styles.mobile : ''}`}>
			{!isMobile && <InfoComponent />}
			<VerifyOtpComponent isMobile={isMobile} />
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	return {
		props: { isMobile: isMobile(context) },
	};
}

export default VerifyOtp;
