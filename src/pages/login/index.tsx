import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import LoginComponent from 'components/Login';
const InfoComponent = dynamic(() => import('components/LoginBrandInfo'), {
	ssr: false,
});

import { isMobile } from 'utils';

import styles from './styles.module.scss';

const Login: NextPage = () => {
	return (
		<div className={styles.login}>
			<LoginComponent />
			{!isMobile && <InfoComponent />}
		</div>
	);
};

export default Login;
