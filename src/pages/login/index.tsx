import { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';

import LoginComponent from 'components/Login';
const InfoComponent = dynamic(() => import('components/LoginBrandInfo'));

import { isMobile } from 'utils';

import styles from './styles.module.scss';

interface LoginPageProps {
	isMobile: boolean;
}

const Login: NextPage<LoginPageProps> = ({ isMobile }) => {
	return (
		<div className={styles.login}>
			<LoginComponent />
			{!isMobile && <InfoComponent />}
		</div>
	);
};

export default Login;

export async function getServerSideProps(context: NextPageContext) {
	return {
		props: { isMobile: isMobile(context) },
	};
}
