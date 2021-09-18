import { NextPage, NextPageContext } from 'next';

import LoginComponent from 'components/Login';
import InfoComponent from 'components/LoginBrandInfo';

import { isMobile } from 'utils';

import styles from './styles.module.scss';

interface LoginPageProps {
	isMobile: boolean;
}

const Login: NextPage<LoginPageProps> = ({ isMobile }) => {
	return (
		<div className={`${styles.login} ${isMobile ? styles.mobile : ''}`}>
			<LoginComponent />
			{!isMobile && <InfoComponent />}
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	return {
		props: { isMobile: isMobile(context) },
	};
}

export default Login;
