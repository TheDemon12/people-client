import type { AppProps } from 'next/app';
import useProgressBar from 'hooks/useProgressBar';

import 'theme/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
	useProgressBar();

	return <Component {...pageProps} />;
}
export default MyApp;
