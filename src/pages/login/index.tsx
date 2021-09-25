import { NextPage, NextPageContext } from 'next';

import LoginComponent from 'components/auth/Login';
import InfoComponent from 'components/auth/LoginBrandInfo';

import { isMobile } from 'utils';

import styles from './styles.module.scss';

interface LoginPageProps {
	isMobile: boolean;
}

const Login: NextPage<LoginPageProps> = ({ isMobile }) => {
	return (
		<div className={`${styles.login} ${isMobile ? styles.mobile : ''}`}>
			{!isMobile && <InfoComponent />}
			<LoginComponent isMobile={isMobile} />
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	return {
		props: { isMobile: isMobile(context) },
	};
}

export default Login;
