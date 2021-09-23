import { NextPage, NextPageContext } from 'next';

import SignupComponent from 'components/Signup';
import InfoComponent from 'components/LoginBrandInfo';

import { isMobile } from 'utils';

import styles from './styles.module.scss';

interface SignupPageProps {
	isMobile: boolean;
}

const Signup: NextPage<SignupPageProps> = ({ isMobile }) => {
	return (
		<div className={`${styles.signup} ${isMobile ? styles.mobile : ''}`}>
			{!isMobile && <InfoComponent />}
			<SignupComponent isMobile={isMobile} />
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	return {
		props: { isMobile: isMobile(context) },
	};
}

export default Signup;
